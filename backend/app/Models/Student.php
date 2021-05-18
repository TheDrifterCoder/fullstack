<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "students";
    protected $fillable = [
        'name', 'patern_surname', 'matern_surname', 'birth_date', 'gender', 'academic_level_id', 'email', 'phone'
    ];

    // Mutators, para poner en mayuscula la primera letra del nombre y apellidos
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = ucfirst($value);
    }

    public function setPaternSurnameAttribute($value)
    {
        $this->attributes['patern_surname'] = ucfirst($value);
    }

    public function setMaternSurnameAttribute($value)
    {
        $this->attributes['matern_surname'] = ucfirst($value);
    }

    public function getStudents($filter){
        return Student::join('academic_levels', 'academic_levels.id', '=', 'students.academic_level_id', 'left outer')
            ->selectRaw('students.id, name, patern_surname, matern_surname, birth_date, gender, email, phone, schooling as academic_level')
            ->get();
    }

    public function getStudentsFiltered($filter){
        return Student::join('academic_levels', 'academic_levels.id', '=', 'students.academic_level_id', 'left outer')
        ->selectRaw('students.id, name, patern_surname, matern_surname, birth_date, gender, email, phone, schooling as academic_level')
        ->whereRaw("upper(name) LIKE '%" . strtoupper($filter) . "%'")
        ->orWhereRaw("upper(patern_surname) LIKE '%" . strtoupper($filter) . "%'")
        ->orWhereRaw("upper(matern_surname) LIKE '%" . strtoupper($filter) . "%'")
        ->get();
    }

 

    
}
