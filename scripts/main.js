let ownedNodeIds = [];

const nodes = new Map();
const adjacency = new Map();
for (const [idStr, node] of Object.entries(SKILL_GRAPH)) {
	const id = parseInt(idStr);
	const [name, x, y, neighbors] = node;
	nodes.set(id, { id, name, x, y });
	if (!adjacency.has(id)) adjacency.set(id, []);
	for (const v of neighbors) {
		adjacency.get(id).push(v);
		if (!adjacency.has(v)) adjacency.set(v, []);
		adjacency.get(v).push(id);
	}
}

function getRequirements() {
	var requirements = {};
	document.querySelectorAll(".slider-row").forEach(function (row) {
		var label = row.querySelector(".slider-label").textContent.trim();
		var slider = row.querySelector("input");
		var output = row.querySelector("output");
		var plusBtn = row.querySelector(".spec-plus-btn");
		if (plusBtn && output && output.value === "1") {
			requirements[label] = 1;
		} else if (slider && parseInt(slider.value) > 0) {
			requirements[label] = parseInt(slider.value);
		}
	});
	return requirements;
}

function dijkstra(adj, src) {
	const dist = new Map(),
		prev = new Map();
	const pq = [[0, src]];
	dist.set(src, 0);
	while (pq.length) {
		pq.sort((a, b) => a[0] - b[0]);
		const [d, u] = pq.shift();
		if (d > dist.get(u)) continue;
		for (const v of adj.get(u) || []) {
			if (!dist.has(v) || dist.get(v) > d + 1) {
				dist.set(v, d + 1);
				prev.set(v, u);
				pq.push([d + 1, v]);
			}
		}
	}
	return { dist, prev };
}

function pruneLeaves(subNodes, terminals, adj) {
	let changed = true;
	while (changed) {
		changed = false;
		for (const n of Array.from(subNodes)) {
			if (!terminals.has(n)) {
				const neighbors = (adj.get(n) || []).filter((v) =>
					subNodes.has(v)
				);
				if (neighbors.length === 1) {
					subNodes.delete(n);
					changed = true;
				}
			}
		}
	}
}

function solveRequirements() {
	var requirements = getRequirements();

	const terminals = new Set();
	for (const [name, k] of Object.entries(requirements)) {
		const matchingNodes = [...nodes.values()].filter(
			(n) => n.name === name
		);
		const candidates = matchingNodes
			.sort((a, b) => {
				const aIsRoot = ROOT_NODES.includes(a.id);
				const bIsRoot = ROOT_NODES.includes(b.id);

				if (aIsRoot && !bIsRoot) return -1;
				if (!aIsRoot && bIsRoot) return 1;

				const distA = Math.sqrt(a.x * a.x + a.y * a.y);
				const distB = Math.sqrt(b.x * b.x + b.y * b.y);
				return distA - distB;
			})
			.slice(0, k);
		for (const c of candidates) terminals.add(c.id);
	}
	if (terminals.size === 0) {
		updateHashFromOwnedNodes();
		return;
	}

	const T = Array.from(terminals);
	const metrics = new Map();
	const paths = new Map();

	const encodePair = (u, v) => (u << 16) | v;

	for (const u of T) {
		const { dist, prev } = dijkstra(adjacency, u);
		for (const v of T) {
			if (u === v) continue;

			const d = dist.get(v) ?? Infinity;
			metrics.set(encodePair(u, v), d);

			const path = [];
			let cur = v;
			while (cur != null && cur !== u) {
				path.push(cur);
				cur = prev.get(cur);
			}
			if (cur === u) {
				path.push(u);
				path.reverse();
				paths.set(encodePair(u, v), path);
				paths.set(encodePair(v, u), [...path].reverse());
			}
		}
	}

	const parent = new Map();
	const find = (x) => {
		if (!parent.has(x)) parent.set(x, x);
		while (parent.get(x) !== x) {
			parent.set(x, parent.get(parent.get(x)));
			x = parent.get(x);
		}
		return x;
	};

	const mstEdges = T.flatMap((u, i) =>
		T.slice(i + 1).map((v) => ({
			u,
			v,
			w: metrics.get(encodePair(u, v)) ?? Infinity,
		}))
	)
		.filter((e) => e.w < Infinity)
		.sort((a, b) => a.w - b.w)
		.reduce((acc, { u, v }) => {
			const pu = find(u),
				pv = find(v);
			if (pu !== pv) {
				parent.set(pu, pv);
				acc.push([u, v]);
			}
			return acc;
		}, []);

	const subNodes = new Set(terminals);
	for (const [u, v] of mstEdges) {
		const path = paths.get(encodePair(u, v)) ?? paths.get(encodePair(v, u));
		if (path) path.forEach((n) => subNodes.add(n));
	}

	pruneLeaves(subNodes, terminals, adjacency);
	updateHashFromOwnedNodes(Array.from(subNodes));
}

function updateWarnings() {
	const specNames = [
		"Safecracker",
		"Dead Silence",
		"Thespian",
		"Covert Takeover",
		"Ammo Economy",
		"Efficient Packing",
		"Full Arsenal",
		"Workshop",
		"Refined Composition",
		"Sharpened Senses",
		"Signal Disruption",
		"Executioner",
	];
	let specCount = 0;
	for (const id of ownedNodeIds) {
		const node = SKILL_GRAPH[id];
		if (node && specNames.includes(node[0])) specCount++;
	}
	let hasStarter = false;
	for (const id of ownedNodeIds) {
		if (ROOT_NODES.includes(id)) {
			hasStarter = true;
			break;
		}
	}
	let disconnected = false;
	if (ownedNodeIds.length > 0) {
		const ownedSet = new Set(ownedNodeIds);
		const queue = ownedNodeIds.filter((id) => ROOT_NODES.includes(id));
		const visited = new Set(queue);
		while (queue.length) {
			const curr = queue.shift();
			const neighbors = (SKILL_GRAPH[curr] && SKILL_GRAPH[curr][3]) || [];
			for (const n of neighbors) {
				if (ownedSet.has(n) && !visited.has(n)) {
					visited.add(n);
					queue.push(n);
				}
			}
		}
		for (const id of ownedNodeIds) {
			if (!visited.has(id)) {
				disconnected = true;
				break;
			}
		}
	}
	let warnings = [];
	if (specCount > 2) {
		warnings.push(`${specCount}/2 specializations`);
	}
	if (!hasStarter) {
		warnings.push("No starter skill selected");
	}
	if (disconnected) {
		warnings.push("All skills must be connected");
	}
	const warningArea = document.getElementById("warning-area");
	if (warnings.length) {
		warningArea.style.display = "";
		warningArea.innerHTML = warnings.map((w) => `<div>${w}</div>`).join("");
	} else {
		warningArea.style.display = "none";
		warningArea.innerHTML = "";
	}
}

function importFromHex(hex) {
	const bits = [];
	
	for (let i = 0; i < hex.length; i++) {
		const nibble = parseInt(hex[hex.length - 1 - i], 16);
		for (let b = 0; b < 4; b++) {
			bits[i * 4 + b] = (nibble >> b) & 1;
		}
	}

	ownedNodeIds = [];
	for (let i = 0; i < NODE_COUNT; i++) {
		if (bits[i]) {
			ownedNodeIds.push(i + 1);
		}
	}

	updateSVG();
}

function updateHashFromOwnedNodes(ownedNodeIds = []) {
	const bits = new Array(NODE_COUNT).fill("0");

	for (const id of ownedNodeIds) {
		if (id >= 1 && id <= NODE_COUNT) {
			bits[id - 1] = "1";
		}
	}

	let hex = "";
	for (let i = 0; i < bits.length; i += 4) {
		const nibbleBits = bits.slice(i, i + 4).reverse().join("");
		const nibble = parseInt(nibbleBits, 2).toString(16);
		hex = nibble + hex;
	}

	hex = hex.replace(/^0+/, "") || "0";
	window.location.hash = hex;
}


document.addEventListener("DOMContentLoaded", function () {
	var sections = document.querySelectorAll(".sliders-content");
	for (var i = 1; i < sections.length; i++) {
		sections[i].classList.add("collapsed");
	}
	var copyLinkBtn = document.createElement("button");
	copyLinkBtn.id = "copy-link-btn";
	copyLinkBtn.textContent = "Copy Share Link";
	document.querySelector(".img-container").appendChild(copyLinkBtn);
	copyLinkBtn.addEventListener("click", function () {
		var url =
			window.location.origin +
			window.location.pathname +
			window.location.search +
			window.location.hash;
		navigator.clipboard.writeText(url).then(function () {
			var oldText = copyLinkBtn.textContent;
			copyLinkBtn.textContent = "Copied!";
			copyLinkBtn.disabled = true;
			setTimeout(function () {
				copyLinkBtn.textContent = oldText;
				copyLinkBtn.disabled = false;
			}, 500);
		});
	});

	if (window.location.hash.length > 1) {
		var hashHex = window.location.hash.slice(1);
		if (/^[0-9a-fA-F]+$/.test(hashHex)) {
			setTimeout(function () {
				importFromHex(hashHex);
			}, 0);
		}
	}
	window.addEventListener("hashchange", function () {
		var hashHex = window.location.hash.slice(1);
		if (/^[0-9a-fA-F]+$/.test(hashHex)) {
			importFromHex(hashHex);
		}
	});
	document
		.querySelector(".solve-btn")
		.addEventListener("click", function (e) {
			e.preventDefault();
			solveRequirements();
		});
	document
		.getElementById("reset-btn")
		.addEventListener("click", function (e) {
			document
				.querySelectorAll(".slider-row input")
				.forEach(function (slider) {
					slider.value = slider.min === "1" ? 1 : 0;
					slider.nextElementSibling.value = slider.value;
				});
			updateHashFromOwnedNodes();
		});
	document.querySelectorAll(".root-btn").forEach(function (btn) {
		btn.addEventListener("click", function (e) {
			var prevRoot = document.getElementById("root_id").value;
			var newRoot = btn.getAttribute("data-root");
			document.getElementById("root_id").value = newRoot;

			document.querySelectorAll(".root-btn").forEach(function (b) {
				b.classList.remove("selected");
			});
			btn.classList.add("selected");
			var rootLabel = SKILL_GRAPH[newRoot][0];
			var prevRootLabel = SKILL_GRAPH[prevRoot][0];
			document.querySelectorAll(".slider-row").forEach(function (row) {
				var label = row
					.querySelector(".slider-label")
					.textContent.trim();
				var input = row.querySelector("input");
				var output = row.querySelector("output");
				if (input && output) {
					if (label === rootLabel) {
						input.min = 1;
						if (parseInt(input.value) === 0) {
							input.value = 1;
						}
					} else if (
						prevRootLabel &&
						label === prevRootLabel &&
						rootLabel !== prevRootLabel
					) {
						input.min = 0;
						if (parseInt(input.value) === 1) {
							input.value = 0;
						}
					} else {
						input.min = 0;
					}
					output.value = input.value;
				}
			});
		});
	});

	enableSVGZoomPan("svg-container");
	updateSVG();
});
