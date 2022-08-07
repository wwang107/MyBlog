package com.wwang.blog.presentation.controllers

import com.wwang.blog.domain.models.Blog
import com.wwang.blog.domain.services.blog.IBlogService
import com.wwang.blog.presentation.dto.BlogCreationDTO
import com.wwang.blog.presentation.dto.BlogDTO
import org.springframework.web.bind.annotation.*

/**
 * All operations with a blog will be routed by this controllers.
 * <p/>
 */
@RestController
@RequestMapping("v1/blogs")
class BlogController(val blogService: IBlogService) {

    @GetMapping("/{blogId}")
    fun getBlog(@PathVariable blogId: Long): BlogDTO = Blog.toDto(blogService.getBlog(blogId))

    @GetMapping
    fun getBlogs(): List<BlogDTO> = blogService.getAllBlogs().map { Blog.toDto(it) }

    @PostMapping
    fun createBlog(@RequestBody dto: BlogCreationDTO): BlogDTO = Blog.toDto(blogService.createBlog(dto))

    @DeleteMapping("/{blogId}")
    fun deleteBlog(@PathVariable blogId: Long) = blogService.deleteBlog(blogId)

    @PutMapping("/{blogId}")
    fun editBlog(@PathVariable blogId: Long, @RequestBody dto: BlogDTO) = blogService.updateBlog(dto.copy(id = blogId))
}
