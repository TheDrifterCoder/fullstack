<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Shared\BaseController;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Symfony\Component\Console\Input\Input;

class StudentController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pagination = 50;
        $model = new Student();
        $expected_data = $model->getStudents($pagination);

        $students = $expected_data;
        return $this->sendResponse('Lista de estudiantes', StudentResource::collection($students));
    }

    // Obtiene todos los registros aun si han sido eliminados
    public function getAllWithTrashedStudents()
    {
        $students = Student::withTrashed()->get();
        return $students;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input_data = $request->all();

        $messages = [
            'name.required' => 'Ingresa el nombre del estudiante.',
            'patern_surname.required' => 'Ingresa el apellido paterno del estudiante.',
            'matern_surname.required' => 'Ingresa el apellido materno del estudiante.',
            'birth_date.required' => 'Ingresa la fecha de nacimiento del estudiante.',
            'gender.required' => 'Ingresa el género del estudiante.',
            'academic_level_id.required' => 'Ingresa el nivel academico del estudiante.',
            'email.required' => 'Ingresa el correo electronico del estudiante.',
            'email.email' => 'El formato de correo ingresado no es valido.',
            'email.unique' => 'El correo ingresado, ya se ha registrado.',
            'phone.required' => 'Ingresa el teléfono del estudiante.',
            'phone.numeric' => 'El telefono debe ser numérico.',
        ];


        $validator = Validator::make($input_data, [
            'name' => 'required',
            'patern_surname' => 'required',
            'matern_surname' => 'required',
            'birth_date' => 'required',
            'gender' => 'required',
            'academic_level_id' => 'required',
            'email' => 'required|email|unique:students',
            'phone' => 'required|numeric',
        ], $messages);

        if (($validator->fails())) {
            return $this->sendError("Error de validación", $validator->errors());
        }

        // se valida si el nombre completo ya ha sido creado previamente
        $fullname_exists = Student::where('name', $input_data['name'])
            ->where('patern_surname', $input_data['patern_surname'])
            ->where('matern_surname', $input_data['matern_surname'])
            ->exists();

        if ($fullname_exists) {
            return $this->sendError("Error de validación", ['fullname' => "Este nombre completo ya ha sido creado previamente"]);
        }

        $student = Student::create($input_data);
        return $this->sendResponse("Estudiante registrado correctamente", new StudentResource($student));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $student_selected = Student::find($request->id);
        $input_data = $request->all();

        $messages = [
            'name.required' => 'Ingresa el nombre del estudiante.',
            'patern_surname.required' => 'Ingresa el apellido paterno del estudiante.',
            'matern_surname.required' => 'Ingresa el apellido materno del estudiante.',
            'birth_date.required' => 'Ingresa la fecha de nacimiento del estudiante.',
            'gender.required' => 'Ingresa el género del estudiante.',
            'academic_level_id.required' => 'Ingresa el nivel academico del estudiante.',
            'email.required' => 'Ingresa el correo electronico del estudiante.',
            'phone.required' => 'Ingresa el teléfono del estudiante.',
            'phone.numeric' => 'El telefono debe ser numérico.',
        ];


        $validator = Validator::make($input_data, [
            'name' => 'required',
            'patern_surname' => 'required',
            'matern_surname' => 'required',
            'birth_date' => 'required',
            'gender' => 'required',
            'academic_level_id' => 'required',
            'email' => 'required',
            'phone' => 'required|numeric'
        ], $messages);

        if (($validator->fails())) {
            return $this->sendError("Error de validación", $validator->errors());
        }

        // se valida si el nombre completo ya ha sido creado previamente
        $fullname_exists =  Student::where('name', $input_data['name'])
            ->where('patern_surname', $input_data['patern_surname'])
            ->where('matern_surname', $input_data['matern_surname'])
            ->where('id', '<>',  $student_selected->id)
            ->exists();

        if ($fullname_exists) {
            return $this->sendError("Error de validación", ['fullname' => "Este nombre completo ya ha sido creado previamente"]);
        }

        $student = Student::where('id', $student_selected->id)
            ->update($input_data);

        return $this->sendResponse("Estudiante actualizado correctamente", new StudentResource($student_selected));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student)
    {
        $student->delete();
        return $this->sendResponse([], 'Los datos del estudiante se han eliminado correctamente.');
    }


    // 
    public function delete(Request $request)
    {
        $dataInput = $request->all();
        $total = count($request->all());

        for ($i = 0; $i < $total; $i++) {
            $data = Student::find($dataInput['data'][$i]);
            $data->delete();
        }

        return $this->sendResponse('Los datos del estudiante se han eliminado correctamente.', []);
    }

    public function filter($filter){
        $model = new Student();
        $expected_data = $model->getStudentsFiltered($filter);

        $students = $expected_data;
        return $this->sendResponse('Lista de estudiantes', StudentResource::collection($students));
    }
}
