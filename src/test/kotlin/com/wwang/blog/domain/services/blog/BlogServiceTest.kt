package com.wwang.blog.domain.services.blog

import com.wwang.blog.dao.IBlogRepository
import com.wwang.blog.domain.services.blog.BlogService
import com.wwang.blog.domain.services.blog.ITagService
import com.wwang.blog.domain.exceptions.EntityNotFoundException
import com.wwang.blog.domain.models.Blog
import com.wwang.blog.presentation.dto.BlogCreationDTO
import com.wwang.blog.presentation.dto.BlogDTO
import io.mockk.*
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.assertThrows
import java.util.*

internal class BlogServiceTest {

    private val blogRepository: IBlogRepository = mockk()
    private val tagService: ITagService = mockk()

    private val blogService = BlogService(blogRepository, tagService)

    @BeforeEach
    fun beforeEach() {
        clearAllMocks()
    }

    @Test
    fun `createBlog should call the save method of blog repository`() {
        every { blogRepository.save(any()) } returns Blog(1, "")
        blogService.createBlog(BlogCreationDTO("test", null, setOf()))
        verify(exactly = 1) { blogRepository.save(any()) }
    }

    @Test
    fun `createBlog should throw EntityNotFound exception when tag does not exist`() {
        every { tagService.searchTags(any()) } returns listOf()
        assertThrows<EntityNotFoundException> { blogService.createBlog(BlogCreationDTO("test", null, setOf("tag"))) }
    }


    @Test
    fun `deleteBlog should call the deleteById method of blog repository`() {
        justRun { blogRepository.deleteById(any()) }
        blogService.deleteBlog(1)
        verify(exactly = 1) { blogRepository.deleteById(1) }
    }


    @Test
    fun `getBlog should call the findById method of blog repository`() {
        every { blogRepository.findById(any()) } returns Optional.of(Blog(1, ""))
        blogService.getBlog(1)
        verify(exactly = 1) { blogRepository.findById(1) }
    }

    @Test
    fun `getBlog should throw EntityNotFound exception when the blog does not exist`() {
        every { blogRepository.findById(any()) } returns Optional.empty()
        assertThrows<EntityNotFoundException> { blogService.getBlog(1) }
    }


    @Test
    fun `getAllBlogs should call the findAll method of blog repository`() {
        every { blogRepository.findAll() } returns listOf()
        blogService.getAllBlogs()
        verify(exactly = 1) { blogRepository.findAll() }
    }


    @Test
    fun `updateBlog should call the save method of blog repository when blog exist`() {
        val blog = Blog(1, "title")
        val dto = Blog.toDto(blog)
        every { blogRepository.findById(any()) } returns Optional.of(blog)
        every { blogRepository.save(any()) } returns blog

        blogService.updateBlog(dto)

        verify(exactly = 1) { blogRepository.save(blog) }
    }

    @Test
    fun `updateBlog should throw EntityNotFound exception when the blog does not exist`() {
        val dto = Blog.toDto(Blog(1, "title"))
        every { blogRepository.findById(any()) } returns Optional.empty()

        assertThrows<EntityNotFoundException> { blogService.updateBlog(dto) }
    }
}
