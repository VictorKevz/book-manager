export type AlertType = "success" | "error";

export type AlertState = {
  message: string;
  type: AlertType;
  visible: boolean;
};
export const EmptyAlertState: AlertState = {
  message: "",
  type: "success",
  visible: false,
};
export interface AlertContextType {
  onShowAlert: (state: AlertState) => void;
  onHideAlert: () => void;
  alert: AlertState;
}
