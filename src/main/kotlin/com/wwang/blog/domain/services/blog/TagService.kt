package com.wwang.blog.domain.services.blog

import com.wwang.blog.dao.ITagRepository
import com.wwang.blog.domain.models.Tag
import org.springframework.stereotype.Service

@Service
class TagService(val tagRepository: ITagRepository) : ITagService {
    override fun searchTags(tagNames: Set<String>): List<Tag> {
        return tagRepository.findAllByTagNameIn(tagNames)
    }

    override fun findTag(tagId: Long): Tag {
        TODO("Not yet implemented")
    }

}
