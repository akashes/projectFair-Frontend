
import { commonAPI } from "./commonAPI"
import { baseUrl } from "./baseUrl"


export const registerAPI =async(user)=>{
    return await commonAPI('post',`${baseUrl}/register`,user,"")
}

export const loginAPI = async(user)=>{
    return await commonAPI('post',`${baseUrl}/login`,user,"")
}

export const addProjectAPI= async(reqBody,reqHeader)=>{
    return await commonAPI('post',`${baseUrl}/project/add`,reqBody,reqHeader)
}

//get home projects

export const getHomeProject=async()=>{
    return await commonAPI('get',`${baseUrl}/project/home-projects`,"","")
}

//get user project
export const getUserProject=async(reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/project/all-user-projects`,"",reqHeader)
}

//get all projects
export const getAllProject=async(searchKey,reqHeader)=>{
    return await commonAPI('get',`${baseUrl}/project/all-projects?search=${searchKey}`,"",reqHeader)
}

export const editUserProject=async(projectId,reqBody,reqHeader)=>{

    return await commonAPI('put',`${baseUrl}/project/update-project/${projectId}`,reqBody,reqHeader)

}

export const deleteUserProject = async(reqBody,reqHeader)=>{
    return await commonAPI('delete',`${baseUrl}/project/delete-project`,reqBody,reqHeader)
}

