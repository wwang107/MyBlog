package com.wwang.blog.dao

import com.wwang.blog.domain.model.Blog
import org.springframework.data.jpa.repository.JpaRepository

interface IBlogRepository: JpaRepository<Blog, Long>{
    fun findByTitle(title: String): Blog
}
