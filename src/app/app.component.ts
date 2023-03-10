import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project';



  formStudent: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    matriculation: new FormControl(null, Validators.required),
    school: new FormControl(null, Validators.required),
  })

  students:any[]=[
   
  ]

  isEditing:boolean = false;
  currentIndex:number = 0

  getLocalStorage() {
    return JSON.parse(String(localStorage.getItem('db_student'))) ?? []
  }
  setLocalStorage(db_student:any[]) {
    localStorage.setItem("db_student", JSON.stringify(db_student))
  }

  ngOnInit() {
    this.students = this.getLocalStorage()
  }

  save() {
    if (this.isEditing) {
      this.students[this.currentIndex] = this.formStudent.value
      this.formStudent.reset()
      this.isEditing = false
    } else {
      this.students.push(this.formStudent.value)
    }
    this.setLocalStorage(this.students)
    console.log("form:", this.formStudent.value)
  }
  
  toggleEdit(student:any, index:number) {
    this.isEditing = true;
    this.currentIndex = index;
    this.formStudent.patchValue({
      name: student.name,
      email: student.email,
      matriculation: student.matriculation,
      school: student.school,
    })
  }

  delete(index:number) {
    this.students.splice(index, 1)
    this.setLocalStorage(this.students)
  }
  // const openModal = () => document.getElementById('modal')
  //     .classList.add('active')

  // const closeModal = () => {
  //     clearFields()
  //     document.getElementById('modal').classList.remove('active')
  // }

  // const getLocalStorage = () => JSON.parse(localStorage.getItem('db_student')) ?? []
  // const setLocalStorage = (dbStudent) => localStorage.setItem("db_student", JSON.stringify(dbStudent))

  // /* CRUD */

  // // Create
  // const createStudent = (student) => {
  //     const dbStudent = getLocalStorage()
  //     dbStudent.push(student)
  //     setLocalStorage(dbStudent)
  // }

  // // Read
  // const readStudent = () => getLocalStorage()

  // // Update
  // const updateStudent = (index, student) => {
  //     const dbStudent = readStudent()
  //     dbStudent[index] = student
  //     setLocalStorage(dbStudent)
  // }

  // // Delete
  // const deleteStudent = (index) => {
  //     const dbStudent = readStudent()
  //     dbStudent.splice(index, 1)
  //     setLocalStorage(dbStudent)
  // }


  // /* Interação com o layout */

  // const isValidFields = () => {
  //     return document.getElementById('form').reportValidity()
  // }

  // const clearFields = () => {
  //     const fields = document.querySelectorAll('.modal-field')
  //     fields.forEach(field => field.value = "")
  //     document.getElementById('nome').dataset.index = 'new'
  //     document.querySelector(".modal-header>h2").textContent = 'Novo Aluno'
  // }

  // const saveStudent = () => {
  //     if (isValidFields()) {
  //         const student = {
  //             nome: document.getElementById('nome').value,
  //             email: document.getElementById('email').value,
  //             matricula: document.getElementById('matricula').value,
  //             escola: document.getElementById('escola').value
  //         }
  //         const index = document.getElementById('nome').dataset.index
  //         if (index == 'new') {
  //             createStudent(student)
  //             updateTable()
  //             closeModal()
  //         } else {
  //             updateStudent(index, student)
  //             updateTable()
  //             closeModal()
  //         }
  //     }
  // }

  // const createRow = (student, index) => {
  //     const newRow = document.createElement('tr')
  //     newRow.innerHTML = `
  //         <td>${student.nome}</td>
  //         <td>${student.email}</td>
  //         <td>${student.matricula}</td>
  //         <td>${student.escola}</td>
  //         <td>
  //             <button type="button" class="button green" id="edit-${index}">Editar</button>
  //             <button type="button" class="button red" id="delete-${index}" >Excluir</button>
  //         </td>
  //     `
  //     document.querySelector('#tableStudent>tbody').appendChild(newRow)
  // }

  // const clearTable = () => {
  //     const rows = document.querySelectorAll('#tableStudent>tbody tr')
  //     rows.forEach(row => row.parentNode.removeChild(row))
  // }

  // const updateTable = () => {
  //     const dbStudent = readStudent()
  //     clearTable()
  //     dbStudent.forEach(createRow)
  // }

  // const fillFields = (student) => {
  //     document.getElementById('nome').value = student.nome
  //     document.getElementById('email').value = student.email
  //     document.getElementById('matricula').value = student.matricula
  //     document.getElementById('escola').value = student.escola
  //     document.getElementById('nome').dataset.index = student.index
  // }

  // const editStudent = (index) => {
  //     const student = readStudent()[index]
  //     student.index = index
  //     fillFields(student)
  //     document.querySelector(".modal-header>h2").textContent = `Editando ${student.nome}`
  //     openModal()
  // }

  // const editDelete = (event) => {
  //     if (event.target.type == 'button') {

  //         const [isEditing, index] = event.target.id.split('-')

  //         if (isEditing == 'edit') {
  //             editStudent(index)
  //         } else {
  //             const student = readStudent()[index]
  //             const response = confirm(`Deseja realmente excluir o aluno ${student.nome}?`)
  //             if (response) {
  //                 deleteStudent(index)
  //                 updateTable()
  //             }
  //         }
  //     }
  // }

  // updateTable()

  // /* Events */
  // document.getElementById('cadastrarAluno')
  //     .addEventListener('click', openModal)

  // document.getElementById('modalClose')
  //     .addEventListener('click', closeModal)

  // document.getElementById('salvar')
  //     .addEventListener('click', saveStudent)

  // document.querySelector('#tableStudent>tbody')
  //     .addEventListener('click', editDelete)

  // document.getElementById('cancelar')
  //     .addEventListener('click', closeModal)
}

