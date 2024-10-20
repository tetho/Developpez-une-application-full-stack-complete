package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.model.User;

@Mapper
public interface UserMapper {

	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO toDTO(User user);
    
    User toEntity(UserDTO userDTO);
}
