function updateSVG() {
	const nodes = {};
	const edges = [];
	for (let i = 0; i < SKILL_GRAPH.length; i++) {
		const entry = SKILL_GRAPH[i];
		const name = entry[0];
		const x = entry[1];
		const y = entry[2];
		const rest = entry[3];
		nodes[i] = { id: i, name, x, y };
		if (Array.isArray(rest)) {
			for (const v of rest) {
				edges.push({ u: i, v });
			}
		}
	}
	const skillMax = {};
	const categories = document.getElementById("categories-container").children;
	for (const section of categories) {
		const rows = section.querySelectorAll(".slider-row");
		for (const row of rows) {
			const label = row.querySelector(".slider-label").textContent.trim();
			const slider = row.querySelector("input");
			if (slider) {
				skillMax[label] = parseInt(slider.max);
			}
		}
	}
	const svg = renderSkillTreeSVG(ownedNodeIds, skillMax);
	document.getElementById("svg-container").innerHTML = svg;
	document.getElementById("level-indicator").textContent =
		"Level " + ownedNodeIds.length;
	updateWarnings();

	let nodeInfoBox = document.getElementById("node-info-box");
	if (!nodeInfoBox) {
		nodeInfoBox = document.createElement("div");
		nodeInfoBox.id = "node-info-box";
		document.body.appendChild(nodeInfoBox);
	}
	function showNodeInfoBox(nodeName, descHtml) {
		nodeInfoBox.innerHTML = `<div style='font-weight:bold;font-size:1.2em;margin-bottom:4px;'>${nodeName}</div>${descHtml}`;
		nodeInfoBox.style.display = "block";
	}
	function hideNodeInfoBox() {
		nodeInfoBox.style.display = "none";
	}

	document
		.querySelectorAll("#svg-container .skill-node")
		.forEach(function (node) {
			node.addEventListener("mouseenter", function (e) {
				const nodeId = parseInt(node.getAttribute("data-id"));
				const nodeData = SKILL_GRAPH[nodeId];
				if (!nodeData) return;
				const nodeName = nodeData[0];
				const descFn = SKILL_DESCRIPTIONS[nodeName];
				let descHtml = "";
				if (typeof descFn === "function") {
					const ownedCount = ownedNodeIds.filter(
						(id) => SKILL_GRAPH[id][0] === nodeName
					).length;
					const isOwned = ownedNodeIds.includes(nodeId);
					try {
						const desc = descFn(ownedCount, ownedNodeIds, isOwned);
						descHtml = `<div style='font-size:1em;'>${desc}</div>`;
					} catch (e) {
						console.error(
							`Error generating description for ${nodeName}:`,
							e
						);
						descHtml = "";
					}
				}
				showNodeInfoBox(nodeName, descHtml);
			});
			node.addEventListener("mouseleave", function (e) {
				hideNodeInfoBox();
			});
		});

	let altDown = false;
	let hoveredNode = null;
	document.addEventListener("keydown", function (e) {
		if (e.key === "Alt") {
			altDown = true;
			document
				.querySelectorAll("#svg-container .skill-node.alt-highlight")
				.forEach(function (n) {
					n.classList.remove("alt-highlight");
				});
			if (hoveredNode) {
				var name = hoveredNode.getAttribute("data-name");
				document
					.querySelectorAll("#svg-container .skill-node")
					.forEach(function (n) {
						if (n.getAttribute("data-name") === name) {
							n.classList.add("alt-highlight");
						}
					});
			}
		}
	});
	document.addEventListener("keyup", function (e) {
		if (e.key === "Alt") {
			altDown = false;
			document
				.querySelectorAll("#svg-container .skill-node.alt-highlight")
				.forEach(function (n) {
					n.classList.remove("alt-highlight");
				});
		}
	});
	document
		.querySelectorAll("#svg-container .skill-node")
		.forEach(function (node) {
			node.addEventListener("mouseenter", function (e) {
				hoveredNode = node;
				if (altDown) {
					var name = node.getAttribute("data-name");
					document
						.querySelectorAll("#svg-container .skill-node")
						.forEach(function (n) {
							if (n.getAttribute("data-name") === name) {
								n.classList.add("alt-highlight");
							}
						});
				}
			});
			node.addEventListener("mouseleave", function (e) {
				hoveredNode = null;
				document
					.querySelectorAll(
						"#svg-container .skill-node.alt-highlight"
					)
					.forEach(function (n) {
						n.classList.remove("alt-highlight");
					});
			});
		});
	document
		.querySelectorAll("#svg-container .skill-node")
		.forEach(function (node) {
			node.addEventListener("click", function (e) {
				e.stopPropagation();
				var id = parseInt(node.getAttribute("data-id"));
				var idx = ownedNodeIds.indexOf(id);
				const newOwnedNodes = [...ownedNodeIds];
				if (idx !== -1) {
					newOwnedNodes.splice(idx, 1);
				} else {
					newOwnedNodes.push(id);
				}
				var oldTooltip = document.getElementById("skill-tooltip");
				if (oldTooltip) oldTooltip.remove();
				updateHashFromOwnedNodes(newOwnedNodes);
			});
		});
}
function enableSVGZoomPan(svgContainerId) {
	const container = document.getElementById(svgContainerId);
	let svg = null;
	let isPanning = false;
	let startX = 0,
		startY = 0;
	let lastX = 0,
		lastY = 0;
	let viewBox = [0, 0, 720, 720];

	function updateViewBox() {
		if (svg) {
			svg.setAttribute(
				"viewBox",
				`${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`
			);
		}
	}

	function zoomAt(mx, my, zoom) {
		if (!svg) return;
		const { left, top, width, height } = svg.getBoundingClientRect();
		const wx = viewBox[0] + (mx - left) * (viewBox[2] / width);
		const wy = viewBox[1] + (my - top) * (viewBox[3] / height);
		const newW = viewBox[2] / zoom;
		const newH = viewBox[3] / zoom;
		viewBox[0] = wx - ((mx - left) / width) * newW;
		viewBox[1] = wy - ((my - top) / height) * newH;
		viewBox[2] = newW;
		viewBox[3] = newH;
		updateViewBox();
	}

	function onWheel(e) {
		e.preventDefault();
		const zoom = e.deltaY < 0 ? 1.15 : 0.87;
		zoomAt(e.clientX, e.clientY, zoom);
	}

	function onMouseDown(e) {
		if (!svg) return;
		if (e.button === 0) {
			isPanning = true;
			startX = lastX = e.clientX;
			startY = lastY = e.clientY;
			svg.style.cursor = "grabbing";
		}
	}

	function onMouseMove(e) {
		if (!svg || !isPanning) return;
		const { width, height } = svg.getBoundingClientRect();
		const dx = (e.clientX - lastX) * (viewBox[2] / width);
		const dy = (e.clientY - lastY) * (viewBox[3] / height);
		viewBox[0] -= dx;
		viewBox[1] -= dy;
		lastX = e.clientX;
		lastY = e.clientY;
		updateViewBox();
	}

	function onMouseUp() {
		isPanning = false;
		if (svg) svg.style.cursor = "grab";
	}

	function attachHandlers() {
		svg = container.querySelector("svg");
		if (!svg) return;
		svg.style.cursor = "grab";
		svg.addEventListener("wheel", onWheel, { passive: false });
		svg.addEventListener("mousedown", onMouseDown);
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
		window.addEventListener("mouseleave", onMouseUp);
		updateViewBox();
	}

	function detachHandlers() {
		if (!svg) return;
		svg.removeEventListener("wheel", onWheel);
		svg.removeEventListener("mousedown", onMouseDown);
		window.removeEventListener("mousemove", onMouseMove);
		window.removeEventListener("mouseup", onMouseUp);
		window.removeEventListener("mouseleave", onMouseUp);
	}

	const observer = new MutationObserver(() => {
		detachHandlers();
		attachHandlers();
	});
	observer.observe(container, { childList: true });
	attachHandlers();
}

function renderSkillTreeSVG(ownedNodeIds, skillMax) {
	const width = 720,
		height = 720;

	const xs = Object.values(SKILL_GRAPH).map((n) => n[1]);
	const ys = Object.values(SKILL_GRAPH).map((n) => n[2]);
	const min_x = Math.min(...xs),
		max_x = Math.max(...xs);
	const min_y = Math.min(...ys),
		max_y = Math.max(...ys);
	const norm_x = (x) =>
		Math.round(((x - min_x) / (max_x - min_x)) * (width - 80) + 40);
	const norm_y = (y) =>
		Math.round(((y - min_y) / (max_y - min_y)) * (height - 80) + 40);

	let svg_lines = "",
		svg_icons = "",
		svg_text = "";

	const base_r = 6;

	for (const [id, node] of Object.entries(SKILL_GRAPH)) {
		for (const v of node[3]) {
			const x1 = norm_x(node[1]),
				y1 = norm_y(node[2]);
			const x2 = norm_x(SKILL_GRAPH[v][1]),
				y2 = norm_y(SKILL_GRAPH[v][2]);
			const owned =
				ownedNodeIds.includes(parseInt(id)) && ownedNodeIds.includes(v);
			svg_lines += `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}' stroke='${
				owned ? "#aaa" : "#888"
			}' stroke-width='${base_r / owned ? 2 : 3}' opacity='${
				owned ? 1 : 0.6
			}' />`;
		}

		const x = norm_x(node[1]),
			y = norm_y(node[2]);
		const owned = ownedNodeIds.includes(parseInt(id));
		const maxval = skillMax[node[0]] || 1;

		let r = base_r;
		if (maxval === 3) r = Math.round(base_r * 1.35);
		else if (maxval === 1) r = Math.round(base_r * 2);

		if (NODE_ICONS[node[0]]) {
			const img_size = r * 2;
			svg_icons += `<image href='./images/${
				NODE_ICONS[node[0]]
			}.png' x='${x - r}' y='${
				y - r
			}' width='${img_size}' height='${img_size}' style='pointer-events:all;filter: brightness(${
				owned ? 1.0 : 0.4
			});cursor:pointer' class='skill-node' data-name='${
				node[0]
			}' data-id='${id}' data-owned='${owned}' />`;
		}

		if (owned) {
			svg_text += `<text x='${x}' y='${
				y + r + base_r
			}' text-anchor='middle' font-size='${base_r}' fill='#fff' pointer-events='none' style='user-select:none'>${
				node[0]
			}</text>`;
		}
	}

	let svg = `<svg viewBox='0 0 ${width} ${height}' style='background:#181a1b; width:100%; height:100%; display:block;' xmlns='http://www.w3.org/2000/svg'>`;
	svg += svg_lines + svg_icons + svg_text;
	svg += "</svg>";

	return svg;
}
