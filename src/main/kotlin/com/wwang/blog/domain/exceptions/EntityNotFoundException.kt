package com.wwang.blog.domain.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus


@ResponseStatus(value = HttpStatus.NOT_FOUND)
class EntityNotFoundException(message: String?) : Exception(message) {
    companion object {
        const val serialVersionUID = -3387516993334229948L
    }
}
