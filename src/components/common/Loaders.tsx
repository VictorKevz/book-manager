import { MoonLoader, SyncLoader } from "react-spinners";

export const SyncLoaderWrapper = () => {
  return <SyncLoader color="#3ecf8e" size={28} speedMultiplier={0.7} />;
};

export const FormLoader = () => {
  return <MoonLoader color="#3ecf8e" size={80} speedMultiplier={0.7} />;
};
