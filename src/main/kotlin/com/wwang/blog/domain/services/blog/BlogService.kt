package com.wwang.blog.domain.services.blog

import com.wwang.blog.dao.IBlogRepository
import com.wwang.blog.domain.exceptions.EntityNotFoundException
import com.wwang.blog.domain.models.Blog
import com.wwang.blog.presentation.dto.BlogCreationDTO
import com.wwang.blog.presentation.dto.BlogDTO
import org.springframework.stereotype.Service

@Service
class BlogService(private val blogRepository: IBlogRepository, private val tagService: ITagService) : IBlogService {
    override fun createBlog(blogDTO: BlogCreationDTO): Blog {
        val blog: Blog = if (blogDTO.tags.isNotEmpty()) {
            val tags = tagService.searchTags(blogDTO.tags)
            val missingTags = blogDTO.tags - tags.map { it.tagName }.toSet()
            if (missingTags.isNotEmpty())
                throw EntityNotFoundException("Can not create blog because these tags are missing: $missingTags; please create missing tags first")
            Blog(title = blogDTO.title, content = blogDTO.content, tags = tags.toMutableSet())
        } else {
            Blog(title = blogDTO.title, content = blogDTO.content)
        }

        return blogRepository.save(blog)
    }

    override fun deleteBlog(blogId: Long) {
        blogRepository.deleteById(blogId)
    }

    override fun getBlog(blogId: Long): Blog {
        return findBlogChecked(blogId)
    }

    override fun getAllBlogs(): List<Blog> {
        return blogRepository.findAll()
    }

    override fun updateBlog(blogDTO: BlogDTO): Blog {
        val blog = findBlogChecked(blogDTO.id)
        val updateBlog = Blog.fromDto(blogDTO)
        blog.title = updateBlog.title
        blog.content = updateBlog.content
        blog.tags = updateBlog.tags

        return blogRepository.save(blog)
    }

    private fun findBlogChecked(blogId: Long): Blog =
        blogRepository.findById(blogId).orElseThrow { EntityNotFoundException("Can not find blog with id $blogId") }

}
