
/**
 * método para ordernar por fecha el historial de busqueda
 * @param {*} array arreglo de items de busqueda
 */
export function sortArrayByDate(array=[]){
    return array.sort(function(a,b){
        return new Date(b.date) - new Date(a.date)
    })
}