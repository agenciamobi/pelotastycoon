import { useEffect, useRef, useState } from 'react';
import { createGame } from './game/createGame';
import {
  GAME_RESET_EVENT,
  GAME_STATE_EVENT,
  initialSnapshot,
  type GameSnapshot,
} from './game/events';

export default function App() {
  const gameHostRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<ReturnType<typeof createGame> | null>(null);
  const [snapshot, setSnapshot] = useState<GameSnapshot>(initialSnapshot);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const onState = (event: Event) => {
      const customEvent = event as CustomEvent<GameSnapshot>;
      setSnapshot(customEvent.detail);
    };
    window.addEventListener(GAME_STATE_EVENT, onState);
    return () => window.removeEventListener(GAME_STATE_EVENT, onState);
  }, []);

  useEffect(() => {
    if (!started || !gameHostRef.current || gameRef.current) return;
    gameRef.current = createGame(gameHostRef.current);
    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [started]);

  const reset = () => {
    if (!window.confirm('Recomeçar a V0.1 e apagar o save local?')) return;
    window.dispatchEvent(new Event(GAME_RESET_EVENT));
  };

  if (!started) {
    return (
      <main className="landing-shell">
        <section className="landing-card">
          <div className="brand-badge">PT</div>
          <p className="eyebrow">MOBI GAMES • PRIMEIRO PROTÓTIPO WEB</p>
          <h1>Pelotas <span>Tycoon</span></h1>
          <p className="intro">
            Todo grande negócio começa pequeno. O primeiro pedaço jogável nasce na Praia do Laranjal.
          </p>
          <button className="primary-button" onClick={() => setStarted(true)}>Jogar agora</button>
          <p className="microcopy">V0.1 • graybox cartoon • save local • navegador + Android</p>
        </section>
      </main>
    );
  }

  return (
    <main className="game-page">
      <section className="game-shell">
        <header className="hud">
          <div>
            <span className="hud-label">Caixa</span>
            <strong>R$ {snapshot.cash.toLocaleString('pt-BR')}</strong>
          </div>
          <div>
            <span className="hud-label">Atendidos</span>
            <strong>{snapshot.served}</strong>
          </div>
          <div>
            <span className="hud-label">Negócio</span>
            <strong>Nv. {snapshot.businessLevel}</strong>
          </div>
        </header>

        <div className="game-stage" ref={gameHostRef} aria-label="Área jogável do Pelotas Tycoon" />

        <footer className="game-controls">
          <p>{snapshot.message}</p>
          <div className="control-row">
            <span>{snapshot.businessOwned ? `Fila ${snapshot.queue}/5` : 'Ponto ainda não comprado'}</span>
            <button className="secondary-button" onClick={reset}>Recomeçar</button>
          </div>
          <small>Toque no cenário para mover. Toque no ponto comercial para comprar ou atender.</small>
        </footer>
      </section>
    </main>
  );
}
