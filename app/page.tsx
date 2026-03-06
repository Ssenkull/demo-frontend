interface Game {
  id: number;
  title: string;
  description: string;
  price: number;
  tags: string[];
  rating: number;
  createdAt: string;
}

async function getGames(): Promise<Game[]> {
  try {
    const res = await fetch("http://demo_backend:3001/games", {
      cache: "no-store",
    });
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const games = await getGames();

  return (
    <main
      style={{
        fontFamily: "sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>🎮 Game Store test</h1>
      <p style={{ color: "#888" }}>Data from NestJS → PostgreSQL + MongoDB</p>

      {games.length === 0 ? (
        <p>No games yet. Add some via the admin panel!</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
          {games.map((game) => (
            <div
              key={game.id}
              style={{
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "1rem",
                background: "#1a1a1a",
                color: "#fff",
              }}
            >
              <h2 style={{ margin: "0 0 0.5rem" }}>{game.title}</h2>
              <p style={{ margin: "0 0 0.5rem", color: "#aaa" }}>
                {game.description}
              </p>
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <span style={{ color: "#4ade80", fontWeight: "bold" }}>
                  ${game.price}
                </span>
                <span style={{ color: "#888" }}>⭐ {game.rating}</span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "#7c3aed",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
