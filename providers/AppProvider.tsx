"use client";
import { store } from "@/store/redux";
import { FunctionComponent, PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
``;
type IProvidersProps = PropsWithChildren;

const AppProvider: FunctionComponent<IProvidersProps> = ({
  children,
}: IProvidersProps) => {
  return (
    <>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </>
  );
};

export default AppProvider;
