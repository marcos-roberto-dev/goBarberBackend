import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentsReposity {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointmentInSameDate = this.appointments.find(appointiment =>
      isEqual(date, appointiment.date),
    );

    return findAppointmentInSameDate || null;
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsReposity;