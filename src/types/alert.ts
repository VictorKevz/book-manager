export type AlertType = "success" | "error";

export type AlertState = {
  message: string;
  type: AlertType;
  visible: boolean;
};
export const InitialAlertState: AlertState = {
  message: "",
  type: "success",
  visible: false,
};
export interface AlertContextType {
  onShowAlert: (update: AlertState) => void;
  alert: AlertState;
}
