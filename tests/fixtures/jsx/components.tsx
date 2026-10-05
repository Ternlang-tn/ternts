import React, { useState, type FC } from "react";
import { Button } from "./button";
interface Props { title: string; items?: string[] }
export const List: FC<Props> = ({ title, items = [] }) => {
  const [n, setN] = useState<number>(0);
  return (
    <div className="list" data-n={n} {...{ id: "x" }}>
      <h1>{title} &amp; more &nbsp;</h1>
      {items.map((it, i) => <li key={i}>{it}</li>)}
      <>
        <Button onClick={() => setN(n + 1)} disabled />
        <Button.Icon name="plus" />
        <svg:rect xlink:href="#a" />
      </>
      text with   spaces
      {/* a comment */}
      <input value={'q"uote'} key="k" {...rest} after="1" />
    </div>
  );
};
declare const rest: any;
export function Generic<T,>(p: { v: T }) { return <span>{String(p.v)}</span>; }
export default function App() { return <List title="t" />; }
