export interface Shift {
  id: string;
  name: string;
  employeeId: string;
  templateId: string;
  startDate: Date | string;
  endDate: Date | string;
}

export interface CreateShiftEvent {
  name: string;
  employeeId: string;
  templateId: string;
  startTime: string;
  endTime: string;
  date: Date;
}
