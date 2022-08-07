package com.wwang.blog.presentation.dto

import com.fasterxml.jackson.annotation.JsonAutoDetect
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.ZonedDateTime

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
data class BlogDTO(
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @get:JsonProperty("blog_id")
    val id: Long,
    val title: String,
    val content: String?,
    val tags: Set<TagDTO>,
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @get:JsonProperty("created_at")
    val createdAt: ZonedDateTime? = null,
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @get:JsonProperty("updated_at")
    val updatedAt: ZonedDateTime? = null
)
