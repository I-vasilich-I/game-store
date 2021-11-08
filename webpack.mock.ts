// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import { writeFileSync, readFileSync } from "fs";
import nodePath from "path";
import { IGame, IUser } from "@/types";

const games: IGame[] = [
  {
    name: "Apex Legends",
    cover: "mock/apex_legends.jpg",
    minicover: "mock/apex_legends_mini.jpg",
    description:
      "Apex Legends is a free-to-play battle royale-hero shooter game developed by Respawn Entertainment and published by Electronic Arts. It was released for Microsoft Windows, PlayStation 4, and Xbox One in February 2019, and for Nintendo Switch in March",
  },
  {
    name: "Counter-Strike: Global Offensive",
    cover: "mock/cs_go.jpg",
    minicover: "mock/cs_go_mini.jpg",
    description:
      "Counter-Strike: Global Offensive is a multiplayer first-person shooter developed by Valve and Hidden Path Entertainment. It is the fourth game in the Counter-Strike series. Developed for over two years, Global Offensive was released for Windows, macOS, Xbox 360, and PlayStation 3 in August 2012, and for Linux",
  },
  {
    name: "Darksiders 2",
    cover: "mock/darksiders_2.jpg",
    minicover: "mock/darksiders_2_mini.jpg",
    description:
      "Darksiders II is an action role-playing hack and slash action-adventure video game developed by Vigil Games and published by THQ.",
  },
  {
    name: "Destiny 2",
    cover: "mock/destiny_2.jpg",
    minicover: "mock/destiny_2_mini.jpg",
    description:
      "Destiny 2 is a free-to-play online-only multiplayer first-person shooter video game developed by Bungie. It was originally released as a pay to play game in 2017 for the PlayStation 4, Xbox One, and Microsoft Windows platforms.",
  },
  {
    name: "Dota 2",
    cover: "mock/dota_2.jpg",
    minicover: "mock/dota_2_mini.jpg",
    description:
      "Dota 2 is a multiplayer online battle arena video game developed and published by Valve. The game is a sequel to Defense of the Ancients, which was a community-created mod for Blizzard Entertainment's Warcraft III: Reign of Chaos.",
  },
  {
    name: "Grand Theft Auto V",
    cover: "mock/gta_5.jpg",
    minicover: "mock/gta_5_mini.jpg",
    description:
      "Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the seventh main entry in the Grand Theft Auto series, following 2008's Grand Theft Auto IV, and the fifteenth instalment overall.",
  },
  {
    name: "Overwatch",
    cover: "mock/overwatch.jpg",
    minicover: "mock/overwatch_mini.jpg",
    description: `Overwatch is a 2016 team-based multiplayer first-person shooter game developed and published by Blizzard Entertainment. Described as a "hero shooter", Overwatch assigns players into two teams of six, with each player selecting from a large roster of characters, known as "heroes", with unique abilities.`,
  },
  {
    name: "The Witcher 3: Wild Hunt",
    cover: "mock/the_witcher_3.jpg",
    minicover: "mock/the_witcher_3_mini.jpg",
    description:
      "The Witcher 3: Wild Hunt is an action role-playing game developed by Polish developer CD Projekt Red, and first published in 2015.",
  },
  {
    name: "War Thunder",
    cover: "mock/war_thunder.jpg",
    minicover: "mock/war_thunder_mini.jpg",
    description:
      "War Thunder is a vehicular combat multiplayer video game developed and published by Gaijin Entertainment. Announced in 2011, it was first released in November 2012 as an open beta with a worldwide release in January 2013; it had its official release on 21 December 2017.",
  },
  {
    name: "World of Tanks Blitz",
    cover: "mock/wot_blitz.jpg",
    minicover: "mock/wot_blitz_mini.jpg",
    description:
      "Meet the legendary tank shooter. Join more than 100 million players! Fight in 7vs7 team battles alone or with friends, research and upgrade armored vehicles, try different tactics and win. Choose a tank and join the battle!",
  },
];

function getRandomInt(max: number, min = 0, float = 0) {
  const number = Math.random() * (max - min) + min;
  return float ? number.toFixed(float) : Math.floor(number);
}

function getRating() {
  return +getRandomInt(5);
}

function getPlatform() {
  const platforms = ["PC", "PS", "XBox"];
  let count = +getRandomInt(3);
  const set = new Set<string>();
  while (count) {
    const index = +getRandomInt(3);
    set.add(platforms[index]);
    count--;
  }

  const res = [...set];
  return res.length ? res : platforms;
}

function getAge() {
  const ages = [3, 6, 12, 18];
  const index = +getRandomInt(4);
  return ages[index] || ages[0];
}

function getDate() {
  const dates = [2021, 2020, 2019, 2018, 2017, 2016, 2015];
  const index = +getRandomInt(7);
  return dates[index] || dates[0];
}

function getPrice() {
  return getRandomInt(100, 10, 2);
}

function prepareData() {
  return [...games].map((el) => {
    const elem = { ...el };
    elem.rating = getRating();
    elem.platform = getPlatform();
    elem.age = getAge();
    elem.year = getDate();
    elem.price = getPrice();
    return elem;
  });
}

export default webpackMockServer.add((app, helper) => {
  const mainData = prepareData().map((el) => {
    const elem = el;
    elem.id = helper.getUniqueIdInt();
    return elem;
  });

  app.get("/api/search/:search", (_req, res) => {
    const response = mainData.filter((el) => el.name.toLowerCase().includes(_req.params.search.toLowerCase()));
    setTimeout(() => {
      res.json(response);
    }, 5000);
  });

  app.get("/api/getTopProducts", (_req, res) => {
    const response = mainData.sort((a, b) => (a.year && b.year ? b.year - a.year : 0)).slice(0, 3);
    setTimeout(() => {
      res.json(response);
    }, 5000);
  });

  app.post("/api/auth/signIn", (_req, res) => {
    const resolvedPath = require.resolve(nodePath.join(__dirname, "./mock.json"));
    const rawData = readFileSync(resolvedPath);
    const users: IUser[] = JSON.parse(rawData.toString()) || [];
    const user: IUser = _req.body;
    const isValid = Boolean(users.find((el) => el.name === user.name && el.password === user.password));
    delete require.cache[resolvedPath];

    if (!isValid) {
      res.status(400);
      setTimeout(() => {
        res.json("Wrong login and/or password");
      }, 5000);
      return;
    }

    setTimeout(() => {
      res.json(user.name);
    }, 5000);
  });

  app.post("/api/auth/signUp", (_req, res) => {
    const resolvedPath = require.resolve(nodePath.join(__dirname, "./mock.json"));
    const rawData = readFileSync(resolvedPath);
    const users: IUser[] = JSON.parse(rawData.toString()) || [];
    const newUser: IUser = _req.body;
    const isExist = Boolean(users.find((el) => el.name === newUser.name));
    delete require.cache[resolvedPath];

    if (isExist) {
      res.status(400);
      setTimeout(() => {
        res.json("User already exist");
      }, 5000);
      return;
    }

    users.push(newUser);
    writeFileSync(resolvedPath, JSON.stringify(users));
    res.status(201);
    setTimeout(() => {
      res.json(newUser.name);
    }, 5000);
  });

  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
