package com.wwang.blog.dao

import com.wwang.blog.domain.model.Blog
import com.wwang.blog.domain.model.Tag
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest

@DataJpaTest
class RepositoryTests {

    @Autowired
    private lateinit var blogRepository: IBlogRepository
    @Autowired
    private lateinit var tagRepository: ITagRepository

    @AfterEach
    fun afterEach(){
        blogRepository.deleteAll()
        tagRepository.deleteAll()
    }

    @Test
    fun `can insert blog`(){
        val blog = Blog()
        blog.title = "title1"

        blogRepository.save(blog)
        val all = blogRepository.findAll()
        assertEquals(1, all.size)
    }

    @Test
    fun `can insert tag`(){
        val tag = Tag()
        tag.tagName = "tag name"

        tagRepository.save(tag)
        val all =tagRepository.findAll()
        assertEquals(1, all.size)
    }

    @Test
    fun `can assign tags to blog`(){
        val blog = Blog()
        blog.title = "title1"
        blogRepository.save(blog)
        val tag = Tag()
        tag.tagName = "tag name"

        blog.tags.add(tag)
        blogRepository.save(blog)
        val foundBlog = blogRepository.findByTitle("title1")

        assertEquals("title1",foundBlog.title)
        assertNotNull(foundBlog.tags.find { it -> it.tagName == "tag name" })
    }
}
