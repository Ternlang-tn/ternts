import React, { useState } from "react";
import { Button } from "./button";
export const List = ({ title, items = [] }) => {
    const [n, setN] = useState(0);
    return (<div className="list" data-n={n} {...{ id: "x" }}>
      <h1>{title} &amp; more &nbsp;</h1>
      {items.map((it, i) => <li key={i}>{it}</li>)}
      <>
        <Button onClick={() => setN(n + 1)} disabled/>
        <Button.Icon name="plus"/>
        <svg:rect xlink:href="#a"/>
      </>
      text with   spaces
      
      <input value={'q"uote'} key="k" {...rest} after="1"/>
    </div>);
};
export function Generic(p) { return <span>{String(p.v)}</span>; }
export default function App() { return <List title="t"/>; }
