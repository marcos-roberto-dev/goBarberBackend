import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsReposity from '../repositories/AppointmentsRepository';

interface RequestTDO {
  provider: string;
  date: Date;
}

class CreateAppointmenteService {
  private appointmentsRepository: AppointmentsReposity;

  constructor(appointmentsRepository: AppointmentsReposity) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestTDO): Appointment {
    const appointlmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointlmentDate,
    );

    if (findAppointmentInSameDate)
      throw Error('This appointment is already booked');

    const appointment = this.appointmentsRepository.create({
      date: appointlmentDate,
      provider,
    });

    return appointment;
  }
}

export default CreateAppointmenteService;
