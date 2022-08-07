package com.wwang.blog.dao

import com.wwang.blog.domain.models.Tag
import org.springframework.data.jpa.repository.JpaRepository

interface ITagRepository : JpaRepository<Tag, Long> {
    fun findAllByTagNameIn(tagNames: Collection<String>): List<Tag>
}
