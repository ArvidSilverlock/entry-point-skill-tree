const ROOT_NODES = [173, 129, 2, 84, 27];
const SKILL_GRAPH = {
	1: ["Advanced Protocols", 672, 768, [61]],
	2: ["Advanced Protocols", 676, 564, [54, 76]],
	3: ["Advanced Protocols", 840, 248, [62, 10]],
	4: ["Agility", 392, 908, [21, 22, 95, 148]],
	5: ["Agility", 248, 444, [160, 213]],
	6: ["Agility", 72, 684, [143]],
	7: ["Ammo Economy", 364, 436, [18, 41, 130, 202]],
	8: ["Ammo Reserves", 592, 248, [154, 9, 131]],
	9: ["Ammo Reserves", 508, 256, [85, 83, 8]],
	10: ["Ammo Reserves", 888, 276, [3, 11]],
	11: ["Ammo Reserves", 936, 308, [10, 12, 184]],
	12: ["Ammo Reserves", 936, 368, [163, 11, 100]],
	13: ["Ammo Reserves", 144, 308, [87, 14, 15]],
	14: ["Ammo Reserves", 192, 276, [162, 13]],
	15: ["Ammo Reserves", 144, 368, [160, 13]],
	16: ["Applied Force", 520, 484, [27, 17]],
	17: ["Applied Force", 484, 452, [39, 16, 18]],
	18: ["Applied Force", 444, 440, [141, 17, 130, 7]],
	19: ["Applied Force", 284, 940, [195, 20]],
	20: ["Applied Force", 340, 924, [19, 21, 22]],
	21: ["Applied Force", 364, 960, [20, 4, 128]],
	22: ["Applied Force", 344, 880, [210, 20, 4]],
	23: ["Applied Force", 544, 80, [207, 24]],
	24: ["Applied Force", 592, 48, [37, 23, 25]],
	25: ["Applied Force", 640, 80, [155, 24]],
	26: ["Armor Proficiency", 724, 336, [152, 153, 209]],
	27: ["Armor Proficiency", 548, 492, [157, 16]],
	28: ["Armor Proficiency", 192, 452, [160, 32]],
	29: ["Awareness", 748, 840, [61, 113, 170]],
	30: ["Awareness", 876, 732, [66, 116]],
	31: ["Awareness", 848, 1008, [70]],
	32: ["Blast Radius", 196, 508, [28, 212, 33]],
	33: ["Blast Radius", 152, 524, [32, 34]],
	34: ["Blast Radius", 112, 484, [33, 132]],
	35: ["Blast Radius", 424, 112, [206, 133, 36, 150]],
	36: ["Blast Radius", 408, 168, [220, 35]],
	37: ["Brute Strength", 592, 108, [155, 207, 24]],
	38: ["Brute Strength", 592, 304, [218, 152, 83]],
	39: ["Brute Strength", 496, 400, [17]],
	40: ["Climber", 228, 176, [46]],
	41: ["Climber", 340, 496, [213, 7, 202]],
	42: ["Climber", 196, 796, [211, 197]],
	43: ["Conditioning", 852, 568, [222, 44, 73]],
	44: ["Conditioning", 844, 636, [164, 43, 45]],
	45: ["Conditioning", 880, 668, [44, 169]],
	46: ["Conditioning", 284, 192, [104, 40, 47]],
	47: ["Conditioning", 340, 204, [220, 46]],
	48: ["Conditioning", 192, 852, [211, 49]],
	49: ["Conditioning", 144, 824, [48, 50]],
	50: ["Conditioning", 144, 764, [49, 197]],
	51: ["Covert Takeover", 940, 464, [221, 55, 74]],
	52: ["Data Compression", 780, 632, [164, 189, 53]],
	53: ["Data Compression", 744, 600, [52, 54]],
	54: ["Data Compression", 700, 584, [53, 2]],
	55: ["Data Compression", 992, 452, [56, 51, 100]],
	56: ["Data Compression", 988, 508, [55, 57, 74]],
	57: ["Data Compression", 1028, 528, [167, 56, 58, 59]],
	58: ["Data Compression", 1068, 488, [86, 57]],
	59: ["Data Compression", 1048, 568, [192, 57]],
	60: ["Data Compression", 660, 820, [90, 64, 61, 103]],
	61: ["Data Compression", 720, 792, [188, 60, 1, 29]],
	62: ["Data Compression", 844, 208, [3, 63, 223]],
	63: ["Data Compression", 900, 192, [165, 191, 62]],
	64: ["Dead Silence", 592, 828, [120, 90, 60, 109]],
	65: ["Discretion", 816, 788, [188, 66]],
	66: ["Discretion", 832, 752, [164, 65, 30]],
	67: ["Discretion", 516, 648, [68]],
	68: ["Discretion", 484, 680, [67, 69]],
	69: ["Discretion", 444, 692, [68, 194]],
	70: ["Discretion", 820, 960, [80, 170, 31, 71]],
	71: ["Discretion", 776, 964, [114, 70, 72]],
	72: ["Discretion", 760, 1020, [196, 71]],
	73: ["Efficient Algorithms", 936, 568, [43, 74, 75]],
	74: ["Efficient Algorithms", 948, 528, [56, 51, 73]],
	75: ["Efficient Algorithms", 948, 604, [73, 105]],
	76: ["Efficient Algorithms", 700, 540, [2, 77]],
	77: ["Efficient Algorithms", 744, 532, [76, 78]],
	78: ["Efficient Algorithms", 776, 500, [166, 189, 77]],
	79: ["Efficient Algorithms", 900, 940, [193, 80]],
	80: ["Efficient Algorithms", 844, 924, [79, 81, 70]],
	81: ["Efficient Algorithms", 840, 880, [80, 82, 170]],
	82: ["Efficient Algorithms", 888, 852, [115, 81]],
	83: ["Efficient Packing", 524, 312, [159, 38, 140, 9]],
	84: ["Electrical Engineering", 636, 492, [175, 215]],
	85: ["Electrical Engineering", 436, 292, [220, 9]],
	86: ["Electrical Engineering", 1108, 448, [58]],
	87: ["Executioner", 192, 336, [161, 13]],
	88: ["Fast Hands", 628, 672, [106, 89]],
	89: ["Fast Hands", 640, 716, [88, 90, 137]],
	90: ["Fast Hands", 624, 760, [89, 64, 60]],
	91: ["Fast Hands", 988, 852, [115, 92]],
	92: ["Fast Hands", 1040, 824, [138, 91, 93]],
	93: ["Fast Hands", 1040, 764, [117, 92]],
	94: ["Fast Hands", 492, 968, [95, 96]],
	95: ["Fast Hands", 444, 936, [4, 94]],
	96: ["Fast Hands", 540, 996, [94, 97, 125, 126]],
	97: ["Fast Hands", 592, 1024, [96]],
	98: ["Full Arsenal", 252, 624, [212]],
	99: ["Gunsmith", 680, 416, [176, 216]],
	100: ["Gunsmith", 992, 396, [55, 12, 182]],
	101: ["Gunsmith", 364, 172, [220]],
	102: ["Intimidation", 396, 568, [203, 145]],
	103: ["Intimidation", 592, 892, [60, 109, 125]],
	104: ["Intimidation", 296, 276, [162, 219, 46]],
	105: ["Lock Artist", 992, 624, [75, 186]],
	106: ["Lock Artist", 636, 644, [88, 110]],
	107: ["Lock Artist", 500, 764, [120, 109]],
	108: ["Low Profile", 460, 792, [121, 109]],
	109: ["Low Profile", 524, 820, [107, 64, 108, 149, 103]],
	110: ["Low Profile", 668, 648, [106, 111]],
	111: ["Low Profile", 700, 680, [110, 112]],
	112: ["Low Profile", 740, 692, [188, 111]],
	113: ["Low Profile", 732, 896, [114, 29]],
	114: ["Low Profile", 740, 940, [113, 170, 71, 123]],
	115: ["Low Profile", 940, 824, [116, 91, 82]],
	116: ["Low Profile", 940, 764, [169, 115, 117, 30]],
	117: ["Low Profile", 988, 736, [116, 186, 93]],
	118: ["Masquerade", 556, 672, [119]],
	119: ["Masquerade", 544, 716, [118, 120]],
	120: ["Masquerade", 560, 760, [119, 107, 64]],
	121: ["Masquerade", 408, 752, [122, 194, 139, 108]],
	122: ["Masquerade", 364, 696, [121, 172, 147, 187]],
	123: ["Masquerade", 692, 968, [114, 124]],
	124: ["Masquerade", 644, 996, [123, 125, 127]],
	125: ["Masquerade", 592, 964, [96, 103, 124]],
	126: ["Masquerade", 540, 1052, [174, 96]],
	127: ["Masquerade", 644, 1056, [174, 124]],
	128: ["Mobile Attacker", 336, 1008, [21]],
	129: ["Mobile Attacker", 504, 564, [204, 146]],
	130: ["Mobile Attacker", 408, 380, [140, 18, 200, 7]],
	131: ["Ordnance Supply", 672, 264, [208, 8]],
	132: ["Ordnance Supply", 72, 444, [34]],
	133: ["Ordnance Supply", 436, 56, [35]],
	134: ["Perseverance", 648, 196, [154]],
	135: ["Perseverance", 328, 564, [212]],
	136: ["Perseverance", 368, 824, [210, 148]],
	137: ["Pickpocket", 676, 716, [89]],
	138: ["Pickpocket", 988, 796, [92]],
	139: ["Pickpocket", 376, 780, [121]],
	140: ["Quick Swap", 460, 340, [83, 141, 142, 130]],
	141: ["Quick Swap", 452, 396, [140, 18]],
	142: ["Quick Swap", 512, 360, [159, 140]],
	143: ["Quick Swap", 112, 648, [6, 144]],
	144: ["Quick Swap", 156, 604, [143, 199]],
	145: ["Quick Swap", 440, 600, [102, 146, 147]],
	146: ["Quick Swap", 480, 588, [129, 145]],
	147: ["Quick Swap", 408, 632, [122, 145]],
	148: ["Quick Swap", 424, 852, [136, 4, 149]],
	149: ["Quick Swap", 488, 880, [109, 148]],
	150: ["Refined Composition", 336, 124, [35]],
	151: ["Reinforcement", 700, 376, [152, 153]],
	152: ["Reinforcement", 660, 312, [151, 26, 38]],
	153: ["Reinforcement", 776, 380, [151, 26, 171, 166]],
	154: ["Reinforcement", 592, 168, [155, 207, 8, 134]],
	155: ["Reinforcement", 644, 136, [154, 156, 37, 25]],
	156: ["Reinforcement", 692, 164, [155, 180]],
	157: ["Reinforcement", 556, 460, [158, 27]],
	158: ["Reinforcement", 544, 416, [157, 159]],
	159: ["Reinforcement", 556, 372, [158, 83, 142]],
	160: ["Reinforcement", 192, 396, [161, 28, 5, 15]],
	161: ["Reinforcement", 244, 368, [160, 162, 87]],
	162: ["Reinforcement", 244, 308, [161, 104, 14]],
	163: ["Reliable Contacts", 876, 404, [171, 221, 12]],
	164: ["Reliable Contacts", 820, 696, [44, 66, 52]],
	165: ["Reliable Contacts", 848, 124, [63, 178, 223]],
	166: ["Remote Access", 820, 436, [177, 153, 222, 78]],
	167: ["Remote Access", 992, 564, [57]],
	168: ["Remote Access", 748, 56, [178]],
	169: ["Safecracker", 920, 704, [45, 116, 185]],
	170: ["Sharpened Senses", 792, 908, [114, 29, 81, 70]],
	171: ["Signal Disruption", 824, 364, [153, 163]],
	172: ["Social Engineering", 340, 632, [122, 214]],
	173: ["Social Engineering", 548, 641, [118, 67]],
	174: ["Social Engineering", 592, 1084, [126, 127]],
	175: ["Technical Expert", 664, 484, [84, 176]],
	176: ["Technical Expert", 696, 452, [175, 177, 99]],
	177: ["Technical Expert", 740, 440, [176, 166]],
	178: ["Technical Expert", 760, 112, [168, 165, 179]],
	179: ["Technical Expert", 776, 168, [178, 180, 223]],
	180: ["Technical Expert", 740, 196, [156, 179, 181, 190]],
	181: ["Technical Expert", 708, 220, [180, 208]],
	182: ["Technical Expert", 1040, 368, [100, 183]],
	183: ["Technical Expert", 1040, 308, [182, 184]],
	184: ["Technical Expert", 988, 276, [11, 183]],
	185: ["Technical Expert", 948, 660, [169, 186]],
	186: ["Technical Expert", 988, 680, [105, 117, 185]],
	187: ["Thespian", 308, 728, [122]],
	188: ["Traversal", 780, 752, [65, 61, 112]],
	189: ["Traversal", 788, 564, [52, 78]],
	190: ["Traversal", 792, 224, [180]],
	191: ["Triangulation", 956, 180, [63]],
	192: ["Triangulation", 1104, 564, [59]],
	193: ["Triangulation", 956, 952, [79]],
	194: ["Undertaker", 464, 744, [69, 121]],
	195: ["Undertaker", 228, 952, [19]],
	196: ["Undertaker", 744, 1076, [72]],
	197: ["Vital Targets", 196, 736, [50, 42, 198]],
	198: ["Vital Targets", 192, 680, [197, 199]],
	199: ["Vital Targets", 196, 624, [212, 144, 198]],
	200: ["Vital Targets", 396, 332, [130, 201]],
	201: ["Vital Targets", 388, 272, [220, 200]],
	202: ["Vital Targets", 408, 500, [41, 7, 203]],
	203: ["Vital Targets", 440, 532, [202, 204, 102]],
	204: ["Vital Targets", 480, 544, [129, 203]],
	205: ["Vitality", 444, 192, [220, 206]],
	206: ["Vitality", 492, 164, [205, 207, 35]],
	207: ["Vitality", 540, 136, [154, 206, 37, 23]],
	208: ["Vitality", 720, 256, [181, 209, 131]],
	209: ["Vitality", 744, 300, [26, 208]],
	210: ["Vitality", 296, 856, [136, 211, 22]],
	211: ["Vitality", 244, 824, [210, 48, 42]],
	212: ["Vitality", 248, 564, [135, 213, 214, 32, 199, 98]],
	213: ["Vitality", 292, 524, [212, 5, 41]],
	214: ["Vitality", 292, 604, [212, 172]],
	215: ["Weak Points", 628, 460, [216]],
	216: ["Weak Points", 640, 416, [215, 217, 99]],
	217: ["Weak Points", 624, 372, [216, 218]],
	218: ["Weak Points", 592, 348, [217, 38]],
	219: ["Weak Points", 344, 252, [220, 104]],
	220: ["Weak Points", 392, 220, [85, 219, 205, 36, 101, 47, 201]],
	221: ["Weak Points", 892, 476, [163, 222, 51]],
	222: ["Weak Points", 844, 496, [166, 221, 43]],
	223: ["Workshop", 820, 172, [165, 62, 179]],
};
const SKILL_CATEGORIES = {
	"Mobile Attacker": {
		"Mobile Attacker": 3,
		Agility: 3,
		Climber: 3,
		Conditioning: 8,
	},

	"Munitions Expert": {
		"Ammo Reserves": 8,
		"Quick Swap": 10,
		"Vital Targets": 8,
		"Weak Points": 8,
	},

	"Destructive Force": {
		"Ordnance Supply": 3,
		"Blast Radius": 5,
		"Brute Strength": 3,
	},

	Juggernaut: {
		"Armor Proficiency": 3,
		Reinforcement: 12,
		Vitality: 10,
		Perseverance: 3,
	},

	Hacker: {
		"Advanced Protocols": 3,
		"Efficient Algorithms": 10,
		"Data Compression": 12,
		Triangulation: 3,
		"Reliable Contacts": 3,
		"Remote Access": 3,
		Traversal: 3,
	},

	Thief: {
		"Social Engineering": 3,
		Pickpocket: 3,
		"Lock Artist": 3,
		Masquerade: 10,
		"Low Profile": 10,
		"Fast Hands": 10,
		Discretion: 8,
		Awareness: 3,
		Intimidation: 3,
		Undertaker: 3,
	},

	Electrician: {
		"Electrical Engineering": 3,
		"Applied Force": 10,
		"Technical Expert": 12,
		Gunsmith: 3,
	},

	Specialisations: {
		Safecracker: 1,
		"Dead Silence": 1,
		Thespian: 1,
		"Covert Takeover": 1,
		"Ammo Economy": 1,
		"Efficient Packing": 1,
		"Full Arsenal": 1,
		Workshop: 1,
		"Refined Composition": 1,
		"Sharpened Senses": 1,
		"Signal Disruption": 1,
		Executioner: 1,
	},
};
const NODE_COUNT = Math.max(...Object.keys(SKILL_GRAPH).map(Number));
const NODE_ICONS = {
	"Advanced Protocols": "Prodigy",
	Agility: "Conditioning",
	"Ammo Economy": "DeepPockets",
	"Ammo Reserves": "HiddenReserves",
	"Applied Force": "PrecisionDrilling",
	"Armor Proficiency": "DemolitionsExpert",
	Awareness: "TheArtOfTheSteal",
	"Blast Radius": "ExplosiveEntry",
	"Brute Strength": "CombatMastery",
	Climber: "FastHands",
	Conditioning: "Conditioning",
	"Covert Takeover": "SurveillanceState",
	"Data Compression": "SpeedHack",
	"Dead Silence": "OutOfSight",
	Discretion: "OutOfSight",
	"Efficient Algorithms": "Dexterity",
	"Efficient Packing": "EquipmentSpecialist",
	"Electrical Engineering": "EquipmentSpecialist",
	Executioner: "SniperMastery",
	"Fast Hands": "FastHands",
	"Full Arsenal": "RifleMastery",
	Gunsmith: "SMGMastery",
	Intimidation: "Intimidation",
	"Lock Artist": "FastHands",
	"Low Profile": "Conditioning",
	Masquerade: "Masquerade",
	"Mobile Attacker": "Conditioning",
	"Ordnance Supply": "ExplosiveEntry",
	Perseverance: "BattlefieldMedicine",
	Pickpocket: "InnerPockets",
	"Quick Swap": "QuickSwap",
	"Refined Composition": "ExplosiveEntry",
	Reinforcement: "ShockPlating",
	"Reliable Contacts": "SurveillanceState",
	"Remote Access": "SpeedHack",
	Safecracker: "AdvancedDeterrent",
	"Sharpened Senses": "OutOfSight",
	"Signal Disruption": "SurveillanceState",
	"Social Engineering": "Deception",
	"Technical Expert": "EquipmentSpecialist",
	Thespian: "Masquerade",
	Traversal: "SpeedHack",
	Triangulation: "SpeedHack",
	Undertaker: "TheArtOfTheSteal",
	"Vital Targets": "VitalTargets",
	Vitality: "Vitality",
	"Weak Points": "SteadyAim",
	Workshop: "RifleMastery",
};

function replace(pattern, multipliers, value) {
	let result = pattern;
	for (let i = 0; i < multipliers.length; i++) {
		result = result.replace('{}', (multipliers[i] * value));
	}
	return result;
}

function chain(array, value, _, isOwned) {
	let result = '';

	for (let i = 0; i < value; i++) {
		result += `<div style='font-size:1em;color:#fff;'>${array[i]}</div>`;
	}

	if (isOwned !== null) {
		if (!isOwned && value < array.length) {
			result += `<div style='font-size:1em;color:#4ea1ff;'>${array[value]}</div>`;
		}

		for (let i = value + (isOwned ? 0 : 1); i < array.length; i++) {
			result += `<div style='font-size:1em;color:#666;'>${array[i]}</div>`;
		}
	}

	return result;
}

const multiplicativeAbility = (pattern, ...multipliers) => (value, ownedNodes, isOwned) => {
	if (isOwned === false) {
		const normalText = `<div style='font-size:1em;color:#fff;'>${replace(pattern, multipliers, value)}</div>`;
		const upgradedText = `<div style='font-size:1em;color:#4ea1ff;'>${replace(pattern, multipliers, value + 1)}</div>`;
		return value === 0 ? upgradedText : `${normalText}${upgradedText}`;
	} else {
		return replace(pattern, multipliers, value);
	}
};

const setAbility = (array) => (value, ownedNodes, isOwned) => {
	return chain(array, value, ownedNodes, isOwned);
};

const singleDescription = (data) => (value, ownedNodes, isOwned) => {
	if (isOwned === false) {
		return `<div style='font-size:1em;color:#4ea1ff;'>${data}</div>`;
	} else {
		return `<div style='font-size:1em;color:#fff;'>${data}</div>`;
	}
};

const SKILL_DESCRIPTIONS = {
	"Technical Expert": multiplicativeAbility("All tech items are {}% faster to use/deploy.", 5),
	"Weak Points": multiplicativeAbility("Your shots ignore {}% of armor.", 6),
	"Vitality": multiplicativeAbility("Increase your maximum health by {}%.", 5),
	"Reinforcement": multiplicativeAbility("Take {}% less damage while wearing armor.", 2),
	"Data Compression": multiplicativeAbility("Network resource cost of hacks is reduced by {}%.", 5),
	"Efficient Algorithms": multiplicativeAbility("Increase hack speed and decrease hack detection risk by {}%.", 5),
	"Low Profile": multiplicativeAbility("When crouched, {}% slower detection and {}% dodge chance.", 4, 3),
	"Fast Hands": multiplicativeAbility("Lockpicking speed is increased by {}%.", 5),
	"Masquerade": multiplicativeAbility("Detection against disguises is {}% slower.", 5),
	"Discretion": multiplicativeAbility("Suspicious activities are detected {}% slower.", 5),
	"Ammo Reserves": multiplicativeAbility("Carry {}% more ammo in reserve.", 5),
	"Applied Force": multiplicativeAbility("Drilling speed is increased by {}%.", 5),
	"Blast Radius": multiplicativeAbility("Explosives have {}% increased range/damage.", 8),
	"Conditioning": multiplicativeAbility("Increase your maximum stamina by {}%.", 10),
	"Vital Targets": multiplicativeAbility("All damage is increased by {}%.", 4),
	"Quick Swap": multiplicativeAbility("Reload all weapons {}% faster.", 4),

	"Electrical Engineering": setAbility([
		"Unlocks the rewire kit, used to bypass certain electronic security measures.",
		"Allows you to overload power boxes, permanently killing power without extra suspicion.",
		"The rewire kit can be used on more advanced or uncommon devices.",
	]),
	"Social Engineering": setAbility([
		"Unlocks extra options for bluffing and lying when talking to certain NPCs.",
		"More extra options are available in conversations or confrontations.",
		"All extra options are available in conversations or confrontations.",
	]),
	"Triangulation": setAbility([
		"Unlocks the ping hack, allowing certain devices to be easily located.",
		"Unlocks the device scan hack, which automatically marks nearby NPCs.",
		"Increases the distance nodes can be seen from the network menu."
	]),
	"Traversal": setAbility([
		"Reduce the network resource cost of the Traversal hack by 20%.",
		"Traversal can travel one node further away from a physically compromised node.",
		"Traversal from a directly compromised node has reduced detection risk."
	]),
	"Remote Access": setAbility([
		"You can directly compromise two access points instead of one.",
		"Remote access can also be used on network switches, a more central component of device networks.",
		"Remote access can be used three times."
	]),
	"Reliable Contacts": setAbility([
		"Tech tools and the hacking tablet cost 25% less in loadouts.",
		"Weapons cost 25% less in loadouts.",
		"All loadout items cost an additional 15% less."
	]),
	"Advanced Protocols": setAbility([
		"Extra hacking options are available in the network menu.",
		"Extra hacking options are unlocked.",
		"All extra hacking options are unlocked.",
	]),
	"Lock Artist": setAbility([
		"Some lockpicking progress will be recovered if lockpicking is interrupted.",
		"More difficult locks can be picked.",
		"20% faster lockpicking speed while not in combat.",
	]),
	"Pickpocket": setAbility([
		"Allows you to pickpocket certain items from NPCs.",
		"Pickpocketing is faster.",
		"Reduces the detection radius of pickpocketing.",
	]),
	"Awareness": setAbility([
		"You can mark 4 NPCs at a time instead of 2.",
		"Inventory of marked NPCs is visible.",
		"NPCs stay marked for longer."
	]),
	"Undertaker": setAbility([
		"Automatically search bodies when picking them up. Both actions are also faster.",
		"Movement speed penalty for maximum encumbrance is reduced.",
		"Enemies drop more ammo and restore a small amount of health when killed.",
	]),
	"Intimidation": setAbility([
		"Stealthy holdups of NPCs are quieter.",
		"Higher level guards can be taken hostage.",
		"Almost all guards can be taken hostage.",
	]),
	"Agility": setAbility([
		"Crouched movement and sprinting are both faster.",
		"30% dodge chance while sprinting.",
		"Stamina recovery is faster.",
	]),
	"Mobile Attacker": setAbility([
		"Move faster while aiming down sights.",
		"Able to shoot while sprinting or sliding.",
		"Able to reload while sprinting or sliding.",
	]),
	"Climber": setAbility([
		"Climbing up ladders and ledges is faster.",
		"Pipes can be climbed, opening up new routes.",
		"Jump higher while sprinting and fall further without being incapacitated.",
	]),
	"Armor Proficiency": setAbility([
		"Armor has a lower impact on your encumbrance level.",
		"All armor also protects from explosive damage.",
		"Concealed items can be used with heavy armor.",
	]),
	"Brute Strength": setAbility([
		"Carry more weight before encumbrance penalties start to apply.",
		"Some objects can be moved, opening new routes or blocking enemies.",
		"Certain doors can be kicked open."
	]),
	"Gunsmith": setAbility([
		"All weapon modifications are free.",
		"Certain guns can be rechambered, switching the type of ammo they fire.",
		"Certain guns can have their fire modes modified.",
	]),
	"Ordnance Supply": setAbility([
		"Can bring an extra C4 to missions",
		"Loading costs for explosives are reduced by 25%.",
		"Can bring one extra of all explosives."
	]),
	"Perseverance": (level, ownedNodes, isOwned) => {
		const vitalityNodeCount = ownedNodes.filter(nodeId => SKILL_GRAPH[nodeId][0] === "Vitality").length;
		const array = [
			"Increases the amount of health you can regenerate.",
			"Shortens the amount of time it takes for health to start regenerating.",
			`Each two 'Vitality' (you have ${vitalityNodeCount}) perks you have increases the amount your health regenerates.`
		];

		return chain(array, level, ownedNodes, isOwned);
	},

	"Executioner": singleDescription("Deal bonus damage in stealth and on headshots."),
	"Efficient Packing": singleDescription("Two extra space in held item inventory. Conceal weapons one size larger."),
	"Ammo Economy": singleDescription("Ammo drops you can't use are coverted to other ammo types at 40% efficiency."),
	"Full Arsenal": singleDescription("Another slot for primary weapons is unlocked."),
	"Safecracker": singleDescription("Certain safes can be cracked without finding the code."),
	"Dead Silence": singleDescription("Walking is silent and all other noises you make are quieter."),
	"Thespian": singleDescription("Fewer people see through your disguises as the alert level rises."),
	"Covert Takeover": singleDescription("Increase maximum hacking detection risk before the alert level starts rising."),
	"Sharpened Senses": singleDescription("Automatically mark people nearby while performing suspicious interactions."),
	"Signal Disruption": singleDescription("Cameras detect you slower. Effect is increased on intercepted cameras."),
	"Workshop": singleDescription("Can use two item mods per item instead of one."),
	"Refined Composition": singleDescription("Explosives do more environmental damage."),
};
