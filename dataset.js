


// Data for Svr 2-7 in order
const datasets = [
    [[
    {"mode": "light", "from": "00:00", "to": "01:00"},
    {"mode": "medium", "from": "12:00", "to": "13:30"}
  ],
  [
    {"mode": "heavy", "from": "18:00", "to": "20:00"}
  ],
  [],
  [
    {"mode": "light", "from": "06:45", "to": "08:00"},
    {"mode": "medium", "from": "11:15", "to": "12:45"},
    {"mode": "heavy", "from": "19:30", "to": "21:00"}
  ],
  [
    {"mode": "medium", "from": "10:00", "to": "11:20"}
  ],
  [],
  [],
  [
    {"mode": "light", "from": "08:15", "to": "09:30"}
  ],
  [
    {"mode": "heavy", "from": "17:45", "to": "19:15"}
  ],
  [
    {"mode": "medium", "from": "12:30", "to": "14:00"}
  ],
  [],
  [
    {"mode": "light", "from": "07:00", "to": "08:15"},
    {"mode": "heavy", "from": "20:00", "to": "22:00"}
  ],
  [],
  [
    {"mode": "medium", "from": "11:30", "to": "12:45"},
    {"mode": "light", "from": "13:15", "to": "14:30"}
  ],
  [
    {"mode": "heavy", "from": "18:15", "to": "20:00"}
  ],
  [],
  [
    {"mode": "light", "from": "06:30", "to": "07:45"}
  ],
  [
    {"mode": "medium", "from": "10:00", "to": "11:15"},
    {"mode": "heavy", "from": "16:30", "to": "18:00"}
  ],
  [],
  [
    {"mode": "light", "from": "08:30", "to": "09:45"}
  ],
  [],
  [],
  [
    {"mode": "medium", "from": "12:45", "to": "14:00"}
  ],
  [
    {"mode": "heavy", "from": "19:45", "to": "21:00"},
    {"mode": "light", "from": "22:30", "to": "23:50"}
  ],
  [],
  [
    {"mode": "medium", "from": "10:15", "to": "11:30"}
  ],
  [],
  [
    {"mode": "light", "from": "06:45", "to": "08:00"},
    {"mode": "heavy", "from": "18:00", "to": "20:15"}
  ],
  [],
  [],
  [
    {"mode": "medium", "from": "12:30", "to": "13:45"}
  ],


// Last item in dataset is mid peak and on peak times, off peak removed as it's the default status
  {midPeak:[[13,15],[17,18]], onPeak:[[18,0]]}
],


// First item showing sunrise and sunset times
    {sunrise:"08:00", sunset:"22:00"},
    [
        ["Sunday",
            { appliance: "washer", mode: "delicate", from: "08:15" }
        ],
        ["Monday",
            { appliance: "oven", mode: "bake", from: "12:30" },
            { appliance: "fridge", mode: "eco", from: "04:10" }
        ],
        ["Tuesday",
            { appliance: "dishwasher", mode: "auto", from: "19:45" }
        ],
        ["Wednesday",
            { appliance: "microwave", mode: "reheat", from: "07:20" },
            { appliance: "washer", mode: "quick", from: "15:50" }
        ],
        ["Thursday",
            { appliance: "oven", mode: "pizza", from: "18:05" }
        ],
        ["Friday",
            { appliance: "fridge", mode: "maxcool", from: "02:55" },
            { appliance: "dishwasher", mode: "intense", from: "21:30" }
        ],
        ["Saturday",
            { appliance: "washer", mode: "wool", from: "09:10" }
        ],
        ["Sunday",
            { appliance: "microwave", mode: "grill", from: "16:40" }
        ],
        ["Monday",
            { appliance: "oven", mode: "roast", from: "11:20" },
            { appliance: "washer", mode: "delicate", from: "06:50" }
        ],
        ["Tuesday",
            { appliance: "fridge", mode: "energy", from: "03:15" }
        ],
        ["Wednesday",
            { appliance: "dishwasher", mode: "light", from: "14:05" }
        ],
        ["Thursday",
            { appliance: "microwave", mode: "popcorn", from: "20:50" }
        ],
        ["Friday",
            { appliance: "washer", mode: "quick", from: "07:35" },
            { appliance: "oven", mode: "bake", from: "18:25" }
        ],
        ["Saturday",
            { appliance: "fridge", mode: "fastfreeze", from: "05:10" }
        ],
        ["Sunday",
            { appliance: "dishwasher", mode: "eco", from: "13:55" }
        ],
        ["Monday",
            { appliance: "microwave", mode: "defrost", from: "09:30" }
        ],
        ["Tuesday",
            { appliance: "washer", mode: "delicate", from: "00:45" }
        ],
        ["Wednesday",
            { appliance: "oven", mode: "pizza", from: "19:15" }
        ],
        ["Thursday",
            { appliance: "fridge", mode: "maxcool", from: "02:20" },
            { appliance: "dishwasher", mode: "auto", from: "16:40" }
        ],
        ["Friday",
            { appliance: "microwave", mode: "reheat", from: "06:35" }
        ],
        ["Saturday",
            { appliance: "washer", mode: "wool", from: "10:00" }
        ],
        ["Sunday",
            { appliance: "oven", mode: "bake", from: "12:10" }
        ],
        ["Monday",
            { appliance: "dishwasher", mode: "intense", from: "21:50" }
        ],
        ["Tuesday",
            { appliance: "fridge", mode: "energy", from: "03:45" },
            { appliance: "microwave", mode: "grill", from: "14:25" }
        ],
        ["Wednesday",
            { appliance: "washer", mode: "quick", from: "09:40" }
        ],
        ["Thursday",
            { appliance: "oven", mode: "roast", from: "17:55" }
        ],
        ["Friday",
            { appliance: "dishwasher", mode: "eco", from: "07:20" }
        ],
        ["Saturday",
            { appliance: "fridge", mode: "fastfreeze", from: "01:15" }
        ],
        ["Sunday",
            { appliance: "microwave", mode: "popcorn", from: "22:40" }
        ],
        ["Monday",
            { appliance: "washer", mode: "delicate", from: "05:30" }
        ],
        ["Tuesday",
            { appliance: "oven", mode: "pizza", from: "18:20" }
        ],
        ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"]
    ],
//[Number of Appliances, [[Number of Operation Modes per appliance], [The Operation Mode]]
    [
    [3, [
        [2, ['u', 'a']],
        [5, ['a', 'u', 'u', 'a', 'a']],
        [1, ['u']]]],
    [2, [
        [3, ['a', 'u', 'u']],
        [1, ['u']]]],
    [5, [
        [2, ['u', 'a']],
        [1, ['a']],
        [4, ['d', 'a', 'u', 'u']],
        [5, ['a', 'a', 'd', 'f', 'u']],
        [3, ['a', 'u', 'a']]]],
    [1, [
        [4, ['u', 'u', 'a', 'a']]]],
    [4, [
        [3, ['u', 'u', 'a']],
        [1, ['a']],
        [2, ['a', 'a']],
        [5, ['u', 'u', 'a', 'a', 'u']]]],
    [2, [
        [1, ['u']],
        [4, ['a', 'a', 'u', 'd']]]],
    [3, [
        [3, ['a', 'u', 'a']],
        [5, ['u', 'u', 'a', 'u', 'a']],
        [2, ['u', 'u']]]],
    [1, [
        [2, ['a', 'u']]]],
    [4, [
        [1, ['u']],
        [3, ['a', 'a', 'u']],
        [4, ['u', 'd', 'u', 'a']],
        [2, ['a', 'a']]]],
    [3, [
        [2, ['u', 'a']],
        [1, ['a']],
        [5, ['u', 'a', 'u', 'u', 'a']]]],
    [2, [
        [3, ['a', 'u', 'u']],
        [4, ['u', 'a', 'a', 'u']]]],
    [1, [
        [5, ['a', 'a', 'u', 'u', 'a']]]]
    ],


// [Months[[total, partial]xDays in the month]] max 100, partial 1-100
// 12 rows for 12 months; x entries of [#,#] for each day in the month
    [
        [[79, 24], [83, 25], [89, 37], [52, 12], [60, 5], [98, 10], [95, 76], [87, 44], [81, 6], [91, 22], [97, 49], [100, 73], [56, 3], [74, 20], [68, 8], [66, 32], [90, 62], [93, 11], [72, 4], [96, 52], [65, 9], [58, 29], [84, 55], [78, 14], [88, 36], [70, 13], [99, 41], [94, 18], [75, 27], [92, 33], [61, 16]],
        [[85, 7], [60, 11], [98, 69], [100, 26], [76, 24], [96, 46], [80, 47], [73, 3], [91, 14], [65, 43], [89, 32], [87, 48], [77, 10], [88, 18], [66, 5], [64, 8], [78, 13], [92, 54], [70, 23], [81, 20], [84, 50], [86, 41], [72, 30], [68, 25], [74, 12], [90, 34], [62, 28], [67, 31]],
        [[73, 17], [98, 35], [90, 25], [84, 27], [82, 50], [80, 12], [96, 44], [95, 58], [71, 20], [97, 49], [78, 43], [94, 62], [99, 31], [85, 67], [81, 13], [79, 46], [93, 11], [100, 63], [66, 23], [91, 16], [77, 59], [83, 7], [64, 40], [89, 19], [70, 10], [92, 28], [74, 8], [88, 18], [76, 6], [68, 14], [63, 9]],
        [[99, 68], [93, 31], [85, 50], [72, 3], [74, 43], [76, 38], [60, 10], [88, 29], [94, 45], [62, 9], [90, 59], [87, 35], [100, 16], [96, 19], [83, 13], [84, 20], [65, 12], [89, 6], [98, 33], [91, 25], [66, 7], [79, 17], [86, 27], [97, 64], [80, 15], [73, 28], [67, 11], [75, 39], [92, 37], [61, 8]],
        [[84, 33], [87, 30], [91, 65], [100, 28], [92, 37], [95, 6], [83, 16], [98, 58], [90, 39], [89, 15], [60, 25], [94, 59], [72, 8], [96, 26], [85, 62], [93, 13], [79, 5], [70, 12], [86, 35], [63, 24], [69, 7], [66, 23], [82, 9], [88, 17], [80, 40], [77, 11], [75, 32], [64, 10], [81, 31], [61, 14], [73, 4]],
        [[81, 62], [98, 69], [85, 60], [83, 3], [88, 27], [91, 34], [94, 7], [99, 28], [73, 8], [66, 25], [96, 33], [92, 26], [100, 64], [79, 15], [87, 44], [65, 11], [84, 17], [89, 53], [75, 30], [63, 16], [70, 4], [93, 31], [86, 19], [74, 5], [80, 23], [61, 12], [76, 21], [60, 9], [78, 6], [67, 22]],
        [[80, 38], [83, 17], [100, 29], [96, 33], [94, 10], [87, 62], [97, 6], [72, 5], [65, 7], [70, 8], [91, 12], [73, 22], [66, 3], [90, 4], [78, 11], [61, 9], [92, 25], [89, 24], [81, 15], [60, 2], [88, 18], [86, 27], [74, 16], [67, 13], [76, 26], [69, 19], [68, 23], [85, 21], [95, 14], [79, 30], [63, 20]],
        [[95, 40], [87, 3], [60, 10], [98, 55], [63, 20], [100, 36], [92, 12], [96, 33], [97, 46], [72, 4], [79, 11], [93, 24], [84, 17], [67, 7], [89, 28], [91, 13], [85, 25], [73, 9], [86, 8], [66, 6], [94, 18], [65, 5], [64, 2], [77, 31], [68, 23], [62, 14], [78, 27], [90, 34], [81, 15], [88, 16], [69, 26]],
        [[84, 5], [91, 18], [63, 11], [100, 27], [80, 19], [85, 6], [97, 39], [90, 23], [65, 12], [93, 42], [78, 31], [94, 33], [60, 2], [70, 8], [96, 36], [72, 9], [62, 7], [74, 21], [69, 14], [73, 26], [67, 25], [88, 29], [83, 4], [98, 16], [76, 17], [81, 13], [92, 10], [95, 32], [61, 20], [68, 22]],
        [[88, 22], [90, 18], [100, 25], [92, 33], [84, 8], [66, 2], [94, 27], [79, 11], [80, 7], [98, 21], [60, 1], [87, 16], [85, 20], [70, 12], [96, 6], [74, 3], [89, 9], [73, 14], [69, 13], [75, 10], [68, 4], [95, 23], [93, 17], [71, 5], [72, 19], [65, 15], [91, 24], [67, 26], [76, 30], [62, 28], [63, 29]],
        [[95, 22], [97, 28], [93, 27], [88, 9], [99, 31], [92, 18], [96, 30], [90, 20], [91, 23], [70, 7], [100, 32], [73, 6], [80, 19], [78, 4], [74, 5], [76, 3], [66, 13], [60, 2], [89, 10], [67, 8], [87, 15], [65, 14], [64, 1], [84, 11], [86, 16], [69, 12], [75, 21], [71, 17], [62, 24], [63, 26]],
        [[85, 14], [95, 19], [96, 27], [98, 33], [78, 25], [100, 12], [91, 20], [89, 13], [92, 31], [83, 28], [90, 23], [60, 1], [73, 6], [84, 3], [62, 9], [74, 4], [65, 7], [94, 22], [86, 2], [63, 5], [82, 11], [64, 8], [81, 10], [76, 24], [93, 21], [66, 17], [79, 26], [88, 15], [77, 18], [87, 29], [69, 16]]
    ],
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
];


module.exports = {datasets};