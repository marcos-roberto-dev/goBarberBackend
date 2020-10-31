import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestTDO {
  provider_id: string;
  date: Date;
}

class CreateAppointmenteService {
  public async execute({
    date,
    provider_id,
  }: RequestTDO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointlmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointlmentDate,
    );

    if (findAppointmentInSameDate)
      throw Error('This appointment is already booked');

    const appointment = appointmentsRepository.create({
      date: appointlmentDate,
      provider_id,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmenteService;
