import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];
// console.log(initialItems);
export default function App() {
  const [items, setItems] = useState([]);
  function handleItems(item) {
    setItems((items) => [...items, item]);
  }
  function deleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleCheckBox(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function clearList() {
    setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAdd={handleItems} />
      <PackingList
        items={items}
        deleteItems={deleteItems}
        handleCheckBox={handleCheckBox}
        clearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form({ onAdd }) {
  const [description, setDes] = useState("");
  const [quantity, setQua] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAdd(newItem);
    setDes("");
    setQua(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select value={quantity} onChange={(e) => setQua(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={(e) => {
          setDes(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, deleteItems, handleCheckBox, clearList }) {
  const [currSt, setCurrSt] = useState("input");
  // function clearList() {
  //   setCurrSt([]);
  // }
  let tempCurrSt;
  // sorting the items based on its state

  if (currSt === "input") tempCurrSt = items;
  if (currSt === "description") {
    tempCurrSt = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (currSt === "packed") {
    tempCurrSt = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {tempCurrSt.map((i) => (
          <Item
            i={i}
            key={i.id}
            deleteItems={deleteItems}
            handleCheckBox={handleCheckBox}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={currSt} onChange={(e) => setCurrSt(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort based on description</option>
          <option value="packed">Sort based on packed status</option>
        </select>
        <button onClick={clearList}>Clear list</button>
      </div>
      ;
    </div>
  );
}
function Item({ i, deleteItems, handleCheckBox }) {
  return (
    <li>
      <input
        type="checkBox"
        onChange={() => {
          handleCheckBox(i.id);
        }}
      ></input>
      <span style={i.packed ? { textDecoration: "line-through" } : {}}>
        {i.quantity} {i.description}
      </span>
      <button onClick={() => deleteItems(i.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = ((numPacked / numItems) * 100).toFixed(0);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%) item`}
      </em>
    </footer>
  );
}
