import { colors } from "../theme";
import { Exercise } from "../types/exercise.type";
import { Meal, WeeklyMealProgram } from "../types/meals.type";

export const WEEKLY_PROGRAM: (Exercise[] | undefined)[] = [
  [
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Dumbell Curl",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: false,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
    {
      id: "17e3b188-9418-42a6-afd9-1cbd1552229f",
      name: "Barbell Curl",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: true,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
    {
      id: "a1d8fee0-5c9b-4cc1-b025-56e42379d570",
      name: "Barbell Chest Press",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: false,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
  ],
  [
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Dumbell Curl",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: false,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
    {
      id: "17e3b188-9418-42a6-afd9-1cbd1552229f",
      name: "Barbell Curl",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: true,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
    {
      id: "a1d8fee0-5c9b-4cc1-b025-56e42379d570",
      name: "Barbell Chest Press",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: false,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
  ],
  [
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Dumbell Curl",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: false,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
    {
      id: "17e3b188-9418-42a6-afd9-1cbd1552229f",
      name: "Barbell Curl",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: true,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
    {
      id: "a1d8fee0-5c9b-4cc1-b025-56e42379d570",
      name: "Barbell Chest Press",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: false,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
  ],
  undefined,
  [
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Dumbell Curl",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: false,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
    {
      id: "17e3b188-9418-42a6-afd9-1cbd1552229f",
      name: "Barbell Curl",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: true,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
    {
      id: "a1d8fee0-5c9b-4cc1-b025-56e42379d570",
      name: "Barbell Chest Press",
      description:
        "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
      isCompleted: false,
      equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
    },
  ],
  undefined,
  undefined,
];

export const ALL_EXERCISES = [
  {
    id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
    name: "Dumbell Curl",
    description:
      "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
    isCompleted: false,
    equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
  },
  {
    id: "17e3b188-9418-42a6-afd9-1cbd1552229f",
    name: "Barbell Curl",
    description:
      "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
    isCompleted: true,
    equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
  },
  {
    id: "a1d8fee0-5c9b-4cc1-b025-56e42379d570",
    name: "Barbell Chest Press",
    description:
      "Eu proident velit esse ea qui commodo est dolor reprehenderit nisi veniam do aliqua.",
    isCompleted: false,
    equipments: ["Foam Roller", "Yoga Mat", "Booty Band", "Bench"],
  },
];

export const NUTRITION_GOALS_DATA = [
  {
    title: "Carbohydrates",
    color: "tomato",
    value: 66,
    target: 150,
  },
  {
    title: "Fat",
    color: "#7EE3EF",
    value: 32,
    target: 100,
  },
  {
    title: "Protein",
    color: "#1F87FE",
    value: 120,
    target: 360,
  },
  {
    title: "Fibre",
    color: colors.primary,
    value: 400,
    target: 430,
  },
];

export const MEALS: Meal[] = [
  {
    id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
    name: "Schnitzel, Salad&Fries",
    calorie: 732,
    fat: 42,
    fibre: 1,
    protein: 30,
    carb: 58,
    image:
      "https://img.taste.com.au/Nwmqo5Pz/taste/2016/11/chicken-schnitzel-and-avocado-salad-92094-1.jpeg",
    isEaten: true,
    isFavorite: false,
    ingredients: [
      {
        name: "Chicken Schnitzel",
        gr: 150,
      },
      {
        name: "Aioli",
        gr: 25,
      },
      {
        name: "Salad Mix",
        gr: 100,
      },
    ],
    recipe: [
      "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
      "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
      "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
      "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
    ],
  },
  {
    id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
    name: "Chinese Beef Stir Fry",
    calorie: 549,
    fat: 4,
    fibre: 13,
    protein: 46,
    carb: 81,
    image:
      "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
    isEaten: false,
    isFavorite: false,
    ingredients: [
      {
        name: "Mixed Vegetables",
        gr: 180,
      },
      {
        name: "Rice",
        gr: 200,
      },
      {
        name: "Sauce",
        gr: 40,
      },
    ],
    recipe: [
      "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
      "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
      "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
      "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
    ],
  },
  {
    id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
    name: "Chinese Beef Stir Fry",
    calorie: 549,
    fat: 4,
    fibre: 13,
    protein: 46,
    carb: 81,
    image:
      "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
    isEaten: false,
    isFavorite: false,
    ingredients: [
      {
        name: "Mixed Vegetables",
        gr: 180,
      },
      {
        name: "Rice",
        gr: 200,
      },
      {
        name: "Sauce",
        gr: 40,
      },
    ],
    recipe: [
      "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
      "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
      "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
      "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
    ],
  },
  {
    id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
    name: "Chinese Beef Stir Fry",
    calorie: 549,
    fat: 4,
    fibre: 13,
    protein: 46,
    carb: 81,
    image:
      "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
    isEaten: false,
    isFavorite: false,
    ingredients: [
      {
        name: "Mixed Vegetables",
        gr: 180,
      },
      {
        name: "Rice",
        gr: 200,
      },
      {
        name: "Sauce",
        gr: 40,
      },
    ],
    recipe: [
      "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
      "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
      "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
      "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
    ],
  },
];

export const WEEKLY_MEALS: WeeklyMealProgram = [
  [
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Chinese Beef Stir Fry",
      calorie: 549,
      fat: 4,
      fibre: 13,
      protein: 46,
      carb: 81,
      image:
        "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
      isEaten: false,
      isFavorite: false,
      ingredients: [
        {
          name: "Mixed Vegetables",
          gr: 180,
        },
        {
          name: "Rice",
          gr: 200,
        },
        {
          name: "Sauce",
          gr: 40,
        },
      ],
      recipe: [
        "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
        "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
        "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
        "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
      ],
    },
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Schnitzel, Salad&Fries",
      calorie: 732,
      fat: 42,
      fibre: 1,
      protein: 30,
      carb: 58,
      image:
        "https://img.taste.com.au/Nwmqo5Pz/taste/2016/11/chicken-schnitzel-and-avocado-salad-92094-1.jpeg",
      isEaten: true,
      isFavorite: false,
      ingredients: [
        {
          name: "Chicken Schnitzel",
          gr: 150,
        },
        {
          name: "Aioli",
          gr: 25,
        },
        {
          name: "Salad Mix",
          gr: 100,
        },
      ],
      recipe: [
        "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
        "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
        "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
        "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
      ],
    },
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Chinese Beef Stir Fry",
      calorie: 549,
      fat: 4,
      fibre: 13,
      protein: 46,
      carb: 81,
      image:
        "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
      isEaten: false,
      isFavorite: false,
      ingredients: [
        {
          name: "Mixed Vegetables",
          gr: 180,
        },
        {
          name: "Rice",
          gr: 200,
        },
        {
          name: "Sauce",
          gr: 40,
        },
      ],
      recipe: [
        "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
        "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
        "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
        "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
      ],
    },
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Schnitzel, Salad&Fries",
      calorie: 732,
      fat: 42,
      fibre: 1,
      protein: 30,
      carb: 58,
      image:
        "https://img.taste.com.au/Nwmqo5Pz/taste/2016/11/chicken-schnitzel-and-avocado-salad-92094-1.jpeg",
      isEaten: true,
      isFavorite: false,
      ingredients: [
        {
          name: "Chicken Schnitzel",
          gr: 150,
        },
        {
          name: "Aioli",
          gr: 25,
        },
        {
          name: "Salad Mix",
          gr: 100,
        },
      ],
      recipe: [
        "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
        "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
        "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
        "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
      ],
    },
  ],
  [],
  [],
  [
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Chinese Beef Stir Fry",
      calorie: 549,
      fat: 4,
      fibre: 13,
      protein: 46,
      carb: 81,
      image:
        "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
      isEaten: false,
      isFavorite: false,
      ingredients: [
        {
          name: "Mixed Vegetables",
          gr: 180,
        },
        {
          name: "Rice",
          gr: 200,
        },
        {
          name: "Sauce",
          gr: 40,
        },
      ],
      recipe: [
        "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
        "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
        "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
        "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
      ],
    },
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Chinese Beef Stir Fry",
      calorie: 549,
      fat: 4,
      fibre: 13,
      protein: 46,
      carb: 81,
      image:
        "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
      isEaten: false,
      isFavorite: false,
      ingredients: [
        {
          name: "Mixed Vegetables",
          gr: 180,
        },
        {
          name: "Rice",
          gr: 200,
        },
        {
          name: "Sauce",
          gr: 40,
        },
      ],
      recipe: [
        "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
        "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
        "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
        "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
      ],
    },
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Chinese Beef Stir Fry",
      calorie: 549,
      fat: 4,
      fibre: 13,
      protein: 46,
      carb: 81,
      image:
        "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
      isEaten: false,
      isFavorite: false,
      ingredients: [
        {
          name: "Mixed Vegetables",
          gr: 180,
        },
        {
          name: "Rice",
          gr: 200,
        },
        {
          name: "Sauce",
          gr: 40,
        },
      ],
      recipe: [
        "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
        "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
        "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
        "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
      ],
    },
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Chinese Beef Stir Fry",
      calorie: 549,
      fat: 4,
      fibre: 13,
      protein: 46,
      carb: 81,
      image:
        "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
      isEaten: false,
      isFavorite: false,
      ingredients: [
        {
          name: "Mixed Vegetables",
          gr: 180,
        },
        {
          name: "Rice",
          gr: 200,
        },
        {
          name: "Sauce",
          gr: 40,
        },
      ],
      recipe: [
        "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
        "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
        "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
        "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
      ],
    },
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Chinese Beef Stir Fry",
      calorie: 549,
      fat: 4,
      fibre: 13,
      protein: 46,
      carb: 81,
      image:
        "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
      isEaten: false,
      isFavorite: false,
      ingredients: [
        {
          name: "Mixed Vegetables",
          gr: 180,
        },
        {
          name: "Rice",
          gr: 200,
        },
        {
          name: "Sauce",
          gr: 40,
        },
      ],
      recipe: [
        "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
        "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
        "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
        "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
      ],
    },
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Chinese Beef Stir Fry",
      calorie: 549,
      fat: 4,
      fibre: 13,
      protein: 46,
      carb: 81,
      image:
        "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
      isEaten: false,
      isFavorite: false,
      ingredients: [
        {
          name: "Mixed Vegetables",
          gr: 180,
        },
        {
          name: "Rice",
          gr: 200,
        },
        {
          name: "Sauce",
          gr: 40,
        },
      ],
      recipe: [
        "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
        "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
        "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
        "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
      ],
    },
    {
      id: "f8d0a688-0dc5-4d50-82dc-c609e88739c7",
      name: "Chinese Beef Stir Fry",
      calorie: 549,
      fat: 4,
      fibre: 13,
      protein: 46,
      carb: 81,
      image:
        "https://cdn.yemek.com/mncrop/940/625/uploads/2017/04/smoothie-bowl-tarifi.jpg",
      isEaten: false,
      isFavorite: false,
      ingredients: [
        {
          name: "Mixed Vegetables",
          gr: 180,
        },
        {
          name: "Rice",
          gr: 200,
        },
        {
          name: "Sauce",
          gr: 40,
        },
      ],
      recipe: [
        "Sint mollit elit minim incididunt duis cillum est elit non eu ad ut. Do id ex mollit culpa.",
        "Enim dolore nisi exercitation mollit reprehenderit nulla in laboris ex est consequat.",
        "Ut voluptate Lorem sunt irure sint ut eu minim Lorem.",
        "Sunt proident eiusmod ea velit duis reprehenderit ullamco. Amet elit mollit esse voluptate esse officia est aute. Quis id consectetur duis deserunt consequat ullamco.",
      ],
    },
  ],
  [],
  [],
  [],
];

export const WEEKLY_WATER_CONSUMPTION = [
  1200, 1000, 300, 350, 1300, 1300, 1300,
];
