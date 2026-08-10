import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { LISTS } from "../data/seed";
import { loadMyLists, makeList, saveMyLists } from "../lib/lists";
import type { CityId, CityList } from "../types";

interface ListsContextValue {
  /** Yours first, then the seeded ones from people you follow. */
  all: CityList[];
  mine: CityList[];
  followed: CityList[];
  byId: (id: string) => CityList | undefined;
  create: (title: string, blurb: string, cities: CityId[]) => CityList;
  update: (id: string, patch: Partial<Pick<CityList, "title" | "blurb" | "cities">>) => void;
  remove: (id: string) => void;
}

const ListsContext = createContext<ListsContextValue | null>(null);

export function ListsProvider({ children }: { children: ReactNode }) {
  const [mine, setMine] = useState<CityList[]>(loadMyLists);

  useEffect(() => {
    saveMyLists(mine);
  }, [mine]);

  const create = useCallback((title: string, blurb: string, cities: CityId[]) => {
    const list = makeList(title, blurb, cities);
    setMine((current) => [list, ...current]);
    return list;
  }, []);

  const update = useCallback(
    (id: string, patch: Partial<Pick<CityList, "title" | "blurb" | "cities">>) => {
      setMine((current) =>
        current.map((list) =>
          list.id === id
            ? { ...list, ...patch, count: patch.cities ? patch.cities.length : list.count }
            : list,
        ),
      );
    },
    [],
  );

  const remove = useCallback((id: string) => {
    setMine((current) => current.filter((list) => list.id !== id));
  }, []);

  const value = useMemo<ListsContextValue>(() => {
    const all = [...mine, ...LISTS];
    return {
      all,
      mine,
      followed: LISTS,
      byId: (id: string) => all.find((list) => list.id === id),
      create,
      update,
      remove,
    };
  }, [mine, create, update, remove]);

  return <ListsContext.Provider value={value}>{children}</ListsContext.Provider>;
}

export function useLists(): ListsContextValue {
  const value = useContext(ListsContext);
  if (!value) throw new Error("useLists must be used inside a ListsProvider");
  return value;
}
