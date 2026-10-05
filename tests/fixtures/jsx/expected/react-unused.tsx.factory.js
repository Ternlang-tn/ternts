import { useMemo } from "react";
export const C = () => { const v = useMemo(() => 1, []); return h("p", null, v); };
