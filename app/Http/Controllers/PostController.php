<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;


class PostController extends Controller
{
    public function index()
    {

        $posts = Post::with('user')->get();

        // dd(PostResource::collection($posts));
          
        return inertia('Profile/Posts/Index', [
            'posts' => PostResource::collection($posts),
            'can' => [
                'post_create' => Auth::check() && Gate::allows('create', Post::class)
            ],
        ]);
    }


    public function store(StorePostRequest $request)
    {
        abort(403);
        $request->user()->posts()->create($request->validated());

        return redirect()->route('posts.index')
            ->with('warning','Post created successfully'); 
    }
}
