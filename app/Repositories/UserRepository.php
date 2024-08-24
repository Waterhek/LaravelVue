<?php

namespace App\Repositories;
use App\Models\User;

class UserRepository
{

    public function getListing($request)
    {
        $query = User::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%");
        }

        return $query->paginate(10);
    }

    public function createUser(array $input)
    {
        User::create($input);
    }

    public function getUser($id)
    {
        return User::findOrFail($id);
    }

    public function updateUser($id, array $input)
    {
        $user = User::findOrFail($id);

        if(!empty($input['password'])){
            $user->password = $input['password'];
        }

        $user->name = $input['name'];
        $user->email = $input['email'];

        $user->save();
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }
}

