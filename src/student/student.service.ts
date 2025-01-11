import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // Create a new student
  async create(studentData: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(studentData);
    return this.studentRepository.save(student);
  }

  // Fetch all students
  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  // Update an existing student
  async update(id: number, studentData: Partial<Student>): Promise<Student> {
    await this.studentRepository.update(id, studentData);
    return this.studentRepository.findOne({ where: {id} });
  }

  // Delete a student
  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
