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
    public function getAllWithTrashedStudents(){
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
        $validator = Validator::make($input_data, [
            'name' => 'required',
            'patern_surname' => 'required',
            'matern_surname' => 'required',
            'birth_date' => 'required',
            'gender' => 'required',
            'academic_level_id' => 'required'
        ]);

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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
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
        $validator = Validator::make($input_data, [
            'name' => 'required',
            'patern_surname' => 'required',
            'matern_surname' => 'required',
            'birth_date' => 'required',
            'gender' => 'required',
            'academic_level_id' => 'required'
        ]);

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
}
