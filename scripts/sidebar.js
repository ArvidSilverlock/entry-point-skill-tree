function createSidebar() {
	const rootContainer = document.getElementById("root-buttons");
	ROOT_NODES.forEach((nodeIndex, i) => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "root-btn";
		btn.dataset.root = nodeIndex;
		const nodeName = SKILL_GRAPH[nodeIndex][0];
		btn.title = nodeName;
		const img = document.createElement("img");
		img.src = `./images/${NODE_ICONS[nodeName]}.png`;
		btn.appendChild(img);
		rootContainer.appendChild(btn);
	});

	setTimeout(() => {
		document.getElementById("root_id").value = ROOT_NODES[0];
		document.querySelectorAll(".root-btn").forEach((b) => {
			b.classList.remove("selected");
			if (b.getAttribute("data-root") == ROOT_NODES[0])
				b.classList.add("selected");
		});
		const rootLabel = SKILL_GRAPH[ROOT_NODES[0]][0];
		document.querySelectorAll(".slider-row").forEach(function (row) {
			var label = row.querySelector(".slider-label").textContent.trim();
			var input = row.querySelector("input");
			var output = row.querySelector("output");
			if (!input) return;
			if (label === rootLabel) {
				input.min = 1;
				if (parseInt(input.value) < 1) input.value = 1;
			} else {
				input.min = 0;
			}
			output.value = input.value;
		});
	}, 0);

	const categoriesContainer = document.getElementById("categories-container");
	Object.keys(SKILL_CATEGORIES).forEach((catName, catIndex) => {
		const section = document.createElement("div");
		section.className = "category-section";

		const title = document.createElement("div");
		title.className = "category-title";
		title.textContent = catName;
		title.onclick = () => toggleSection(`section_${catIndex}`);

		const content = document.createElement("div");
		content.className = "sliders-content";
		content.id = `section_${catIndex}`;
		if (catIndex > 0) content.classList.add("collapsed");

		if (catName === "Specialisations") {
			let selectedSpecs = [];
			Object.entries(SKILL_CATEGORIES[catName]).forEach(
				([skillName, count]) => {
					const row = document.createElement("div");
					row.className = "slider-row";
					const label = document.createElement("span");
					label.className = "slider-label";
					label.textContent = skillName;

					const minusBtn = document.createElement("button");
					minusBtn.type = "button";
					minusBtn.textContent = "-";
					minusBtn.className = "spec-minus-btn";

					const plusBtn = document.createElement("button");
					plusBtn.type = "button";
					plusBtn.textContent = "+";
					plusBtn.className = "spec-plus-btn";

					const output = document.createElement("output");
					output.value = "0";
					output.style.display = "none";
					let selected = false;

					function updateRow() {
						if (selected) {
							row.classList.add("selected-spec");
							output.value = "1";
							plusBtn.disabled = true;
							minusBtn.disabled = false;
						} else {
							row.classList.remove("selected-spec");
							output.value = "0";
							plusBtn.disabled = selectedSpecs.length >= 2;
							minusBtn.disabled = true;
						}
					}

					plusBtn.onclick = function () {
						if (!selected && selectedSpecs.length < 2) {
							selected = true;
							selectedSpecs.push(skillName);
							updateRow();
							updateAllSpecRows();
						}
					};

					minusBtn.onclick = function () {
						if (selected) {
							selected = false;
							selectedSpecs = selectedSpecs.filter(
								(s) => s !== skillName
							);
							updateRow();
							updateAllSpecRows();
						}
					};

					function updateAllSpecRows() {
						section.querySelectorAll(".slider-row").forEach((r) => {
							const plus = r.querySelector(".spec-plus-btn");
							const minus = r.querySelector(".spec-minus-btn");
							if (plus && minus) {
								if (r === row) return;
								const out = r.querySelector("output");
								if (out.value === "1") {
									plus.disabled = true;
									minus.disabled = false;
								} else {
									plus.disabled = selectedSpecs.length >= 2;
									minus.disabled = true;
								}
							}
						});
					}
					
					row.appendChild(label);
					row.appendChild(minusBtn);
					row.appendChild(plusBtn);
					row.appendChild(output);
					content.appendChild(row);
					updateRow();
				}
			);
			section.appendChild(title);
			section.appendChild(content);
			categoriesContainer.appendChild(section);
			return;
		} else {
			Object.entries(SKILL_CATEGORIES[catName]).forEach(
				([skillName, count]) => {
					const row = document.createElement("div");
					row.className = "slider-row";
					const label = document.createElement("span");
					label.className = "slider-label";
					label.textContent = skillName;
					const isRoot = skillName === SKILL_GRAPH[ROOT_NODES[0]][0];
					const slider = document.createElement("input");
					slider.type = "range";
					slider.min = isRoot ? "1" : "0";
					slider.max = count.toString();
					slider.value = isRoot ? "1" : "0";
					slider.oninput = (e) =>
						(e.target.nextElementSibling.value = e.target.value);
					const output = document.createElement("output");
					output.value = slider.value;
					row.appendChild(label);
					row.appendChild(slider);
					row.appendChild(output);
					content.appendChild(row);
				}
			);
		}

		section.appendChild(title);
		section.appendChild(content);
		categoriesContainer.appendChild(section);
	});
}

function toggleSection(id) {
	var el = document.getElementById(id);
	if (el.classList.contains("collapsed")) {
		el.classList.remove("collapsed");
		el.parentElement.setAttribute("data-user-open", "true");
	} else {
		el.classList.add("collapsed");
		el.parentElement.setAttribute("data-user-open", "false");
	}
}

function filterSkills() {
	var search = document.getElementById("skill-search").value.toLowerCase();
	var catSections = document.getElementsByClassName("category-section");
	for (var i = 0; i < catSections.length; i++) {
		var section = catSections[i];
		var catTitle = section
			.getElementsByClassName("category-title")[0]
			.textContent.toLowerCase();
		var sliders = section.getElementsByClassName("slider-row");
		var anyVisible = false;
		for (var j = 0; j < sliders.length; j++) {
			var label = sliders[j]
				.getElementsByClassName("slider-label")[0]
				.textContent.toLowerCase();
			if (
				label.indexOf(search) !== -1 ||
				catTitle.indexOf(search) !== -1
			) {
				sliders[j].style.display = "";
				anyVisible = true;
			} else {
				sliders[j].style.display = "none";
			}
		}
		if (anyVisible || catTitle.indexOf(search) !== -1) {
			section.style.display = "";
			var slidersContent =
				section.getElementsByClassName("sliders-content")[0];
			if (search && slidersContent.classList.contains("collapsed")) {
				slidersContent.classList.remove("collapsed");
				section.setAttribute("data-auto-opened", "true");
			}
		} else {
			section.style.display = "none";
		}
		if (!search) {
			var slidersContent =
				section.getElementsByClassName("sliders-content")[0];
			if (section.getAttribute("data-auto-opened") === "true") {
				if (section.getAttribute("data-user-open") !== "true") {
					slidersContent.classList.add("collapsed");
				}
				section.removeAttribute("data-auto-opened");
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", createSidebar);
