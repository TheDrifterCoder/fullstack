<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'patern_surname' => $this->patern_surname,
            'matern_surname' => $this->matern_surname,
            'birth_date' => $this->birth_date,
            'gender' => $this->gender,
            'created_at' => $this->craeted_at,
            'updated_at' => $this->updated_at
        ];
    }
}
