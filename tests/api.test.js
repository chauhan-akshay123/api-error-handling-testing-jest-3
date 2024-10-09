const request = require("supertest");
const { app } = require("../index.js");
const {
  getGames,
  getGameById,
  getGenres,
  getGenreById
} = require("../games.js");

const http = require("http");
const { describe, beforeEach } = require("node:test");

jest.mock("../games.js", () => {
  const actualModule = jest.requireActual("../games.js");
  return {
    ...actualModule,
    getGames: jest.fn(),
    getGameById: jest.fn(),
    getGenres: jest.fn(),
    getGenreById: jest.fn()
  };
});

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Error Handling Test", () => {
  beforeEach(() => {
   jest.clearAllMocks();
  });
  
  it("GET API /api/games should return 404 if no games are found", async () => {
    getGames.mockResolvedValue([]);

    const response = await request(server).get("/api/games");
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toBe("Games not found");
  }); 

  it("GET API /api/games/:id should return 404 for a non-existing game", async () => {
    getGameById.mockResolvedValue(null);

    const response = await request(server).get("/api/games/998");
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toBe("No game found");
  });

  it("GET API /api/genres should return 404 if no genres are found", async () => {
    getGenres.mockResolvedValue([]);

    const response = await request(server).get("/api/genres");
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toBe("No genres found");
  });
  
  it("GET API /api/genres/:id should return 404 for a non-existing genre", async () => {
    getGenreById.mockResolvedValue(null);

    const response = await request(server).get("/api/genres/9889");
    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toBe("No genre found");
  });

});