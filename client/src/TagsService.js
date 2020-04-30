import axios from 'axios';

const url = '/api/tags/';

class TagsService {
    // Get Tags
    static getTags() {
        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
                let data = res.data;
                resolve(
                    data.map(tag => ({
                        ...tag,
                        createdAt: new Date(tag.createdAt)
                    })).reverse()
                );
            })
            .catch((err)=> {
                reject(err);
            })
            
        });
    }
    // Create Tag 
    static insertTag(text, color) {
        return axios.post(url, {
            text,
            color
        });
    }
    // Update Tag 
    static updateTag(id, text) {
        return axios.patch(`${url}${id}`, {
            text
        });
    }
    // Delete Post
    static deleteTag(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default TagsService;