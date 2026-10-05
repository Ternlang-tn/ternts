import * as React from "react";
import { useMemo } from "react";
export const C = () => { const v = useMemo(() => 1, []); return <p>{v}</p>; };
