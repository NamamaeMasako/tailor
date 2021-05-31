<?php

namespace Database\Factories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class MemberFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Member::class;

    /**
     * Define the model's default state.
     * 
     * faker rules: https://github.com/fzaninotto/Faker
     *
     * @return array
     */
    public function definition()
    {
        return [
            'email' => $this->faker->email(),
            'password' => bcrypt('1qaz2wsx'),
            'name' => $this->faker->name()
        ];
    }

}
