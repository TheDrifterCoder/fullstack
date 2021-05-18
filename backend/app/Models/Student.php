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
        'name', 'patern_surname', 'matern_surname', 'birth_date', 'gender', 'academic_level_id'
    ];

    public function academic_level(){
        return $this->hasOne(academicLevel::class);
    }


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

 

    
}
