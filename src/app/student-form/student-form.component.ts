import { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit, OnChanges {
  studentForm: FormGroup = new FormGroup({});
  @Output() onSubmit = new EventEmitter<Student>();
  @Input()
  student!: Student;
  @Input()
  isEdit!: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeStudentForm();
  }

  ngOnChanges() {
    if (this.isEdit && this.student) {
      delete this.student['id'];
      this.studentForm.setValue(this.student);
    }
  }

  initializeStudentForm(): void {
    this.studentForm = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z]+$')],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z]+$')],
      ],
      rollNumber: [
        '',
        [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')],
      ],
      age: [
        '',
        [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')],
      ],
      gender: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z]+$')],
      ],
    });
  }

  getError(control: string, isNumericField: boolean): string {
    if (this.studentForm.get(control)?.hasError('pattern'))
      return isNumericField ? 'Only numbers allowed' : 'Only alphabets allowed';
    return 'Value required';
  }

  handleSubmit(): void {
    const formData: Student = {
      firstName: this.studentForm.get('firstName')?.value,
      lastName: this.studentForm.get('lastName')?.value,
      rollNumber: this.studentForm.get('rollNumber')?.value,
      age: this.studentForm.get('age')?.value,
      gender: this.studentForm.get('gender')?.value
    };
    this.onSubmit.emit(formData);
    this.studentForm.reset();
  }

}
