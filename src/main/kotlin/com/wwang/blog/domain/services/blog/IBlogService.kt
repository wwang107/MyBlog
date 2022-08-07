package com.wwang.blog.domain.services.blog

import com.wwang.blog.domain.models.Blog
import com.wwang.blog.presentation.dto.BlogCreationDTO
import com.wwang.blog.presentation.dto.BlogDTO

interface IBlogService {
    fun createBlog(blogDTO: BlogCreationDTO): Blog

    fun deleteBlog(blogId: Long)

    fun getBlog(blogId: Long): Blog

    fun getAllBlogs(): List<Blog>

    fun updateBlog(blogDTO: BlogDTO): Blog
}
