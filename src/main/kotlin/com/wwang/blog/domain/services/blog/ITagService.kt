package com.wwang.blog.domain.services.blog

import com.wwang.blog.domain.models.Tag

interface ITagService {
    fun searchTags(tagNames: Set<String>): List<Tag>

    fun findTag(tagId: Long): Tag
}
