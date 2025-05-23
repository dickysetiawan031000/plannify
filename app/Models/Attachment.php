<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attachment extends Model
{
    use HasFactory;

    protected $table = 'attachments';
    protected $fillable = [
        'user_id',
        'card_id',
        'link',
        'file',
        'name',
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function card():BelongsTo
    {
        return $this->belongsTo(Card::class);
    }
}
