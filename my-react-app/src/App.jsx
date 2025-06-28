import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [actorsList, setActorsList] = useState([]);
  const [dancersList, setDancersList] = useState([]);

  const [newActorInput, setNewActorInput] = useState("");
  const [newDancerInput, setNewDancerInput] = useState("");

  const [paidActors, setPaidActors] = useState([]);
  const [paidDancers, setPaidDancers] = useState([]);

  const [actorsHasLoaded, setActorsHasLoaded] = useState(false);
  const [dancersHasLoaded, setDancersHasLoaded] = useState(false);
  const [paidActorsHasLoaded, setPaidActorsHasLoaded] = useState(false);
  const [paidDancersHasLoaded, setPaidDancersHasLoaded] = useState(false);

  useEffect(() => {
    const savedActors = JSON.parse(localStorage.getItem("actors"));
    const savedDancers = JSON.parse(localStorage.getItem("dancers"));
    const savedPaidActors = JSON.parse(localStorage.getItem("paidActors"));
    const savedPaidDancers = JSON.parse(localStorage.getItem("paidDancers"));

    if (savedActors) setActorsList(savedActors);
    if (savedDancers) setDancersList(savedDancers);
    if (savedPaidActors) setPaidActors(savedPaidActors);
    if (savedPaidDancers) setPaidDancers(savedPaidDancers);

    setActorsHasLoaded(true);
    setDancersHasLoaded(true);
    setPaidActorsHasLoaded(true);
    setPaidDancersHasLoaded(true);
  }, []);

  useEffect(() => {
    if (actorsHasLoaded) {
      localStorage.setItem("actors", JSON.stringify(actorsList));
    }
  }, [actorsList, actorsHasLoaded]);

  useEffect(() => {
    if (dancersHasLoaded) {
      localStorage.setItem("dancers", JSON.stringify(dancersList));
    }
  }, [dancersList, dancersHasLoaded]);

  useEffect(() => {
    if (paidActorsHasLoaded) {
      localStorage.setItem("paidActors", JSON.stringify(paidActors));
    }
  }, [paidActors, paidActorsHasLoaded]);

  useEffect(() => {
    if (paidDancersHasLoaded) {
      localStorage.setItem("paidDancers", JSON.stringify(paidDancers));
    }
  }, [paidDancers, paidDancersHasLoaded]);

  const addActor = () => {
    const actor = {
      id: Date.now(),
      text: newActorInput,
    };
    if (newActorInput.trim() !== "") {
      setActorsList([...actorsList, actor]);
    }
    setNewActorInput("");
  };

  const addDancer = () => {
    const dancer = {
      id: Date.now(),
      text: newDancerInput,
    };
    if (newDancerInput.trim() !== "") {
      setDancersList([...dancersList, dancer]);
    }
    setNewDancerInput("");
  };

  const togglePaidActor = (paidActorId) => {
    setPaidActors((currentPaidActors) =>
      currentPaidActors.includes(paidActorId)
        ? currentPaidActors.filter((id) => id !== paidActorId)
        : [...currentPaidActors, paidActorId]
    );
  };

  const togglePaidDancer = (paidDancerId) => {
    setPaidDancers((currentPaidDancers) =>
      currentPaidDancers.includes(paidDancerId)
        ? currentPaidDancers.filter((id) => id !== paidDancerId)
        : [...currentPaidDancers, paidDancerId]
    );
  };

  const deleteActor = (actorToDeleteId) => {
    setActorsList(actorsList.filter((actor) => actor.id !== actorToDeleteId));
    setPaidActors(paidActors.filter((id) => id !== actorToDeleteId));
  };

  const deleteDancer = (dancerToDeleteId) => {
    setDancersList(
      dancersList.filter((dancer) => dancer.id !== dancerToDeleteId)
    );
    setPaidDancers(paidDancers.filter((id) => id !== dancerToDeleteId));
  };

  return (
    <div>
      <h1>Список актеров и танцоров</h1>
      <p>Тех кто получил оплату - зачеркнуть</p>
      <div className="inputs-wrapper">
        <div className="input-block">
          <div className="input-row">
            <input
              type="text"
              placeholder="Введите ФИО артиста"
              value={newActorInput}
              onChange={(e) => setNewActorInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addActor()}
            />
            <button onClick={addActor}>Добавить</button>
          </div>

          <ul>
            {actorsList.map((actor) => (
              <li key={actor.id}>
                <span
                  onClick={() => togglePaidActor(actor.id)}
                  style={{
                    textDecoration: paidActors.includes(actor.id)
                      ? "line-through"
                      : "none",
                  }}
                >
                  {actor.text}
                </span>
                <button onClick={() => deleteActor(actor.id)}>Удалить</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="input-block">
          <div className="input-row">
            <input
              type="text"
              placeholder="Введите ФИО танцора"
              value={newDancerInput}
              onChange={(e) => setNewDancerInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addDancer()}
            />
            <button onClick={addDancer}>Добавить</button>
          </div>

          <ul>
            {dancersList.map((dancer) => (
              <li key={dancer.id}>
                <span
                  onClick={() => togglePaidDancer(dancer.id)}
                  style={{
                    textDecoration: paidDancers.includes(dancer.id)
                      ? "line-through"
                      : "none",
                  }}
                >
                  {dancer.text}
                </span>
                <button onClick={() => deleteDancer(dancer.id)}>Удалить</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
