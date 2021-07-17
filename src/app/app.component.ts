import { Component, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Student } from './student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'student-portal';
  students: Student[] = [];
  isEdit = false;
  selectedStudent!: Student;
  @ViewChild(MatSelectionList)
  selectionList!: MatSelectionList;

  resetSelection() {
    const selected = this.selectionList?.selectedOptions?.selected;
    if(Array.isArray(selected) && selected.length) {
      this.selectionList.selectedOptions.selected[0].selected = false;
      this.isEdit = false;
    }
  }

  handleSubmit(event: Student) {
    const updatedList = [...this.students];
    if (this.isEdit) {
      const index = this.students.findIndex(student => student.id === event.id);
      updatedList.splice(index, 1, event);
    } else {
      updatedList.push({...event, id: this.students.length+1});
    }
    updatedList.sort((a, b) => {
      return a.rollNumber - b.rollNumber;
    });
    this.students = [...updatedList];
    this.resetSelection();
  }

  selectedListOption(student: Student) {
    this.selectedStudent = student;
    this.isEdit = true;
  }
}
