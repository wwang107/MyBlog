package com.wwang.blog.dao

import com.wwang.blog.domain.model.Tag
import org.springframework.data.jpa.repository.JpaRepository

interface ITagRepository: JpaRepository<Tag, Long>{
}
